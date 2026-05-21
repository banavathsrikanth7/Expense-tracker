import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {

return(
<html lang="en">
<body className="bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100 min-h-screen">
<Toaster position="top-right"/>
<nav className="
flex
flex-col
sm:flex-row
justify-between
items-center
px-6
py-4
bg-white/70
backdrop-blur-md
shadow-lg
border-b-2
border-gray-300
sticky
top-0
z-50
">
<div>
<a
href="/dashboard"
className="
inline-block
px-5
py-2
rounded-xl
border-2
border-blue-600
bg-blue-500
text-white
font-semibold
transition-all
duration-300
hover:scale-105
hover:bg-blue-700
hover:shadow-xl
"
>
Dashboard
</a>
</div>
<div className="
flex
gap-4
mt-4
sm:mt-0
">
<a
href="/login"
className="
px-5
py-2
rounded-xl
border-2
border-purple-500
bg-white
text-purple-700
font-semibold
transition-all
duration-300
hover:scale-105
hover:bg-purple-500
hover:text-white
hover:shadow-lg
"
>
Login
</a>
<a
href="/register"
className="
px-5
py-2
rounded-xl
border-2
border-green-500
bg-white
text-green-700
font-semibold
transition-all
duration-300
hover:scale-105
hover:bg-green-500
hover:text-white
hover:shadow-lg
"
>

Register

</a>

</div>

</nav>

<div>

{children}

</div>

</body>

</html>

)

}
