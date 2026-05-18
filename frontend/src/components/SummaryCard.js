export default function SummaryCard({
title,
value,
color
}){

return(

<div className={`
${color}
text-white
p-6
rounded-2xl
shadow-xl
hover:scale-105
transition
duration-300
`}>

<h3 className="
text-lg
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

</div>

)

}