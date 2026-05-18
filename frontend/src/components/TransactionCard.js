export default function TransactionCard({
item
}){

return(

<div className="
bg-white
rounded-xl
shadow-lg
p-5
hover:-translate-y-1
transition
duration-300
">

<div className="
flex
justify-between
items-center
">

<div>

<h3 className="
font-bold
text-xl
">

{item.title}

</h3>

<p className="
text-gray-500
">

{item.category}

</p>

</div>

<div>

<p className="
font-bold
text-2xl
">

₹ {item.amount}

</p>

<p>

{item.type}

</p>

</div>

</div>

</div>

)

}