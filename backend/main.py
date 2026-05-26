
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi import Header
from models import User, Transaction
from database import SessionLocal
from auth import hash_password, verify_password, create_token,verify_token
from schemas import LoginRequest

from fastapi import *
from fastapi.middleware.cors import CORSMiddleware
from schemas import RegisterRequest,TransactionRequest
from fastapi.responses import FileResponse

import csv
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://expense-tracker-5qtqliqb7-banavath-srikanths-projects.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/register")
def register (data: RegisterRequest):
    db = SessionLocal()
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        return {"error": "User already exists"}
    hashed = hash_password(data.password)
    user = User(name=data.name, email=data.email, password=hashed)
    db.add(user)
    db.commit()

    return {"message": "User created"}


@app.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        return {"error": "User not found"}

    if not verify_password(data.password, user.password):
        return {"error": "Invalid password"}

    token = create_token({"sub": user.email})

    return {"access_token": token}


@app.get("/profile")
def profile(Authorization: str = Header(None)):
    print("AUTH:", Authorization)
    if not Authorization:
        return{"error":"token is missing"}
    token = Authorization.split(" ")[1] 
    payload = verify_token(token)

    if not payload:
        return {"error": "Invalid token"}

    return {
        "message": "Welcome to your profile",
        "user": payload}
def get_current_user(token: str):

    payload = verify_token(token)

    if not payload:
        return None

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == payload["sub"]
    ).first()

    return user


@app.post("/transactions")
def create_transaction(data: TransactionRequest, Authorization: str = Header(None)):
    print("AUTH:", Authorization)
    current_user = get_current_user(Authorization)
    if not Authorization:
        return {"error": "Unauthorized"}
    token = Authorization.replace("Bearer ", "")
    current_user = get_current_user(token)
    if not current_user:
        return {"error": "Unauthorized"}
    db = SessionLocal()
    transaction = Transaction(
        title=data.title,
        amount=data.amount,
        category=data.category,
        description=data.description,
        type=data.type,
        user_id=current_user.id
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return {"message": "Transaction created"}


@app.get("/transactions")
def get_transactions(Authorization: str = Header(None)):
    print("AUTH:", Authorization)
   
    if not Authorization:
        return {"error": "invalid token "}
    token = Authorization.replace("Bearer ", "")
    current_user = get_current_user(token)
    if not current_user:
        return {"error": "invalid token "}
    db = SessionLocal()
    transactions = db.query(Transaction).filter(Transaction.user_id == current_user.id).all()
    return transactions


@app.get("/summary")
def get_summary(Authorization:str=Header(None)):
    print("SUMMARY START")

    try:
        token=Authorization.replace( "Bearer ","")
        current_user=  get_current_user( token)
        print("USER:", current_user )
        db= SessionLocal()
        transactions= db.query(Transaction).filter( Transaction.user_id==current_user.id ).all()
        print(
        "DATA:",
        transactions
        )

        total_income=0
        total_expense=0

        for t in transactions:

            print(
            t.type
            )

            if t.type=="income":

                total_income+=float(
                t.amount
                )

            elif t.type=="expense":

                total_expense+=float(
                t.amount
                )

        balance =  total_income-total_expense
       

        return{

        "total_income":
        total_income,

        "total_expense":
        total_expense,

        "balance":
        balance

        }

    except Exception as e:

        print(
        "ERROR:",
        e
        )

        return{

        "error":
        str(e)

        }


@app.get("/category-summary")   
def category_summary(Authorization: str = Header(None)):
   
    if not Authorization:
        return {"error": "invalid token "}
    token = Authorization.replace("Bearer ", "")
    current_user = get_current_user(token)
    if not current_user:
        return {"error": "invalid token "}
    db = SessionLocal()
    transactions = db.query(Transaction).filter(Transaction.user_id == current_user.id).all()
    category_summary= {}

    for transaction in transactions:
        if transaction.category not in category_summary:
            category_summary[transaction.category] = 0
        if transaction.type == "income":
            category_summary[transaction.category] += transaction.amount
        elif transaction.type == "expense":
            category_summary[transaction.category] -= transaction.amount

    return category_summary

@app.delete("/transactions/{transaction_id}")
def delete_transaction(
    transaction_id: int,
    Authorization: str = Header(None)
):
    token = Authorization.replace("Bearer ", "")
    current_user = get_current_user(token)

    if not current_user:
        return {"error": "Unauthorized"}

    db = SessionLocal()

    transaction = db.query(Transaction).filter(
        Transaction.id == transaction_id,
        Transaction.user_id == current_user.id
    ).first()

    if not transaction:
        return {"error": "Transaction not found"}

    db.delete(transaction)

    db.commit()

    return {"message": "Transaction deleted"}

@app.put("/transactions/{transaction_id}")
def update_transaction(
    transaction_id: int,
    data: TransactionRequest,
    Authorization: str = Header(None)
):
    token = Authorization.replace("Bearer ", "")
    current_user = get_current_user(token)

    if not current_user:
        return {"error": "Unauthorized"}

    db = SessionLocal()

    transaction = db.query(Transaction).filter(
        Transaction.id == transaction_id,
        Transaction.user_id == current_user.id
    ).first()

    if not transaction:
        return {"error": "Transaction not found"}
  
    transaction.title = data.title
    transaction.amount = data.amount
    transaction.category = data.category
    transaction.description = data.description
    transaction.type = data.type
    transaction.user_id = current_user.id
    
    
    db.commit()

    return {"message": "Transaction updated"}
@app.get("/export")
def export_data(
    Authorization:str=Header(None)
):

    try:

        print("EXPORT START")

        token=  Authorization.replace( "Bearer ","")
        

        current_user= get_current_user(token)
       

        print(
        "USER:",
        current_user
        )

        db= SessionLocal()
       

        transactions= db.query(
        Transaction
        ).filter(
        Transaction.user_id==
        current_user.id
        ).all()

        print(
        "TRANSACTIONS:",
        transactions
        )

        file="transactions.csv"

        with open(
        file,
        "w",
        newline=""
        ) as csvfile:

            writer=csv.writer(csvfile)
            
            

            writer.writerow([
            "Title",
            "Amount",
            "Category",
            "Type"
            ])

            for t in transactions:

                writer.writerow([
                t.title,
                t.amount,
                t.category,
                t.type
                ])

        return FileResponse(
        file,
        media_type="text/csv",
        filename="transactions.csv"
        )

    except Exception as e:

        print(
        "EXPORT ERROR:",
        e
        )

        return{
        "error":
        str(e)
        }