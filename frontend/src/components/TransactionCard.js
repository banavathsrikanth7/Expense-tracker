"use client";

import {
    FaUtensils,
    FaBook,
    FaMoneyBill,
    FaShoppingBag,
    FaQuestion
}
from "react-icons/fa";

export default function TransactionCard({

    item,
    onDelete,
    onEdit

}){

function getIcon(){

switch(
item.category
){

case "Food":

return <FaUtensils/>;

case "Education":

return <FaBook/>;

case "Salary":

return <FaMoneyBill/>;

case "Shopping":

return <FaShoppingBag/>;

default:

return <FaQuestion/>;

}

}


return(

<div className="
bg-white
rounded-xl
shadow-lg
p-5
hover:shadow-2xl
transition
duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white
">

<div className="
flex
justify-between
items-center
">

<div className="
flex
items-center
gap-4
">

<div className="
text-2xl
">

{getIcon()}

</div>


<div>

<h2 className="
font-bold
text-lg
">

{item.title}

</h2>
{
item.is_recurring && (

<span className="
bg-purple-500
text-white
px-2
py-1
rounded
text-sm
">

🔁 {item.recurring_type}

</span>

)
}

<p className="
text-gray-500
">

{item.category}

</p>

</div>

</div>


<div className="
text-right
">

<p className="
font-bold
text-xl
">

₹ {item.amount}

</p>


<p className={

item.type==="income"

?

"text-green-500"

:

"text-red-500"

}

>

{item.type}

</p>

<button
    onClick={() => onEdit(item)}
    className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 mr-2"
>
    Edit
</button>
<button
    onClick={() => onDelete(item.id)}
    className="bg-red-500 text-white px-3 py-1 rounded mt-2"
>
    Delete
</button>

</div>

</div>

</div>

)

}