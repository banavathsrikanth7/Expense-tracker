"use client";

export default function Navbar() {

return(

<nav className="
bg-black
text-white
p-4
rounded-xl
mb-6
shadow-lg
flex
justify-between
">

<h1 className="
text-2xl
font-bold
">
Expense Tracker
</h1>

<button

onClick={()=>{
localStorage.removeItem("token");
window.location.href="/login"
}}

className="
bg-red-500
px-4
py-2
rounded-lg
hover:bg-red-600
"
>

Logout

</button>

</nav>

)

}