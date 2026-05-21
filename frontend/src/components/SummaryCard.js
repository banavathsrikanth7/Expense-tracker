"use client";

import { motion } from "framer-motion";

export default function SummaryCard({
title,
value
}){

return(

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1
}}

whileHover={{
scale:1.05,
y:-5
}}

className="
animated-card
text-white
p-4
rounded-2xl
shadow-xl
h-28
flex
flex-col
justify-center
transition-all
duration-500
"

>

<h3 className="
text-sm
font-semibold
">

{title}

</h3>

<h1 className="
text-3xl
font-bold
mt-2
">

₹ {value}

</h1>

</motion.div>

)

}