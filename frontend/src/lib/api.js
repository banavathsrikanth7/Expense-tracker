const BASE_URL = "http://127.0.0.1:8000";

export async function signup(data) {

    const response = await fetch(
        `${BASE_URL}/signup`,
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

    return response.json();
}