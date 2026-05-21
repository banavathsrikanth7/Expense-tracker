"use client";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { exportTransactions } from "@/lib/api";

export default function Navbar(){

const router =
useRouter();

function handleLogout(){

    localStorage.removeItem(
        "token"
    );

    router.push(
        "/login"
    );

}

return(

<nav className="
bg-gradient-to-r
from-indigo-600
via-purple-600
to-pink-500
text-white
p-4
rounded-xl
mb-6
shadow-xl
flex
flex-col
sm:flex-row
items-center
justify-between
gap-4
hover:shadow-2xl
transition-all
duration-300
">

<div className="
flex
items-center
gap-3
">

<div className="
text-4xl
hover:rotate-12
transition
duration-300
">

👜

</div>

<h1 className="
text-2xl
md:text-3xl
font-extrabold
tracking-wide
">

Expense Tracker

</h1>

</div>


<div className="
flex
items-center
gap-3
flex-wrap
justify-center
">

<ThemeToggle/>


<button

onClick={
exportTransactions
}

className="
bg-white/20
backdrop-blur-md
px-4
py-2
rounded-xl
border
border-white
hover:bg-white
hover:text-black
hover:scale-105
transition-all
duration-300
"

>

📄 Download

</button>


<button

onClick={handleLogout}

className="
bg-red-500
px-4
py-2
rounded-xl
hover:bg-red-700
hover:scale-105
transition-all
duration-300
"

>

Logout

</button>

</div>

</nav>

)

}