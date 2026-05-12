from pydantic import BaseModel

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class TransactionRequest(BaseModel):
    title: str
    amount: int
    category: str
    description: str
    type:str
    