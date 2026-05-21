"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function ExpenseChart({
    transactions
}) {

const data =
transactions.map((item)=>({

name:item.category,

value:Number(item.amount)

}));

return(

<div className="
bg-white
rounded-2xl
shadow-lg
p-6
h-[400px] dark:bg-gray-700 dark:border-gray-600 dark:text-white
">

<h2 className="
text-2xl
font-bold
mb-4
">

Expense Breakdown

</h2>

<ResponsiveContainer>

<PieChart>

<Pie
data={data}
dataKey="value"
nameKey="name"
outerRadius={120}
label
>

{
data.map((_,index)=>(

<Cell
key={index}
/>

))
}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

)

}