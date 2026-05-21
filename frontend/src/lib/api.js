const BASE_URL = "http://127.0.0.1:8000";

export async function register(data) {

    const response = await fetch(
        `${BASE_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return response.json();
}

export async function login(data) {

    const response = await fetch(
        `${BASE_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return response.json();
}
export async function getProfile(){
    const token = localStorage.getItem("token")
    const response = await fetch(
        `${BASE_URL}/profile`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
    return response.json();
}
export async function getSummary(){
    const token = localStorage.getItem("token");
    const response = await fetch(
       `${BASE_URL}/summary`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
    return response.json();
}
export async function getTransactions() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/transactions`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.json();
}
export async function addTransaction(data) {
try{
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/transactions`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                Authorization:
                    `Bearer ${token}`
            },

            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    console.log("Transaction added:", result);
    return result;

    
}
catch(error){
    console.log("Error adding transaction:", error);
    
}}
export async function deleteTransaction(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/transactions/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.json();
}
export async function updateTransaction(id,data) {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}/transactions/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        }
    );
    return response.json();
}
export async function exportTransactions(){
    const token = localStorage.getItem("token");
    const response = await fetch( "http://127.0.0.1:8000/export",
{
headers:{Authorization:`Bearer ${token}`} }  );
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "transactions.csv";
a.click();}