"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import SummaryCard from "../../components/SummaryCard";
import TransactionCard from "../../components/TransactionCard";
import {
    getProfile,
    getSummary,
    getTransactions,
    addTransaction
} from "@/lib/api";
export default function DashboardPage() {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        type: "",
        description: ""
    });
    const [profile, setProfile] = useState(null);
    const [summary, setSummary] = useState(null);
    const [transactions, setTransactions] = useState([]);
    async function loadData() { 
        const profileData =
            await getProfile();

        const summaryData =
            await getSummary();

        const transactionData =
            await getTransactions();

        setProfile(profileData);

        setSummary(summaryData);

        setTransactions(transactionData);
    }

    useEffect(() => {

        loadData();

    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        await addTransaction(form);

        setForm({
            title:"",
            amount:"",
            category:"",
            type:"",
            description:""
        });

        loadData();
    }

   return (

<div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">

<Navbar/>

<div className="p-6 max-w-6xl mx-auto">

{
profile && (

<div className="
bg-white
rounded-2xl
shadow-lg
p-6
mb-8
">

<h2 className="
text-3xl
font-bold
">

Welcome 👋

</h2>

<p className="
text-gray-500
mt-2
">

{profile.user.sub}

</p>

</div>

)
}


{
summary && (

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mb-8
">

<SummaryCard
title="Total Income"
value={summary.total_income}
color="bg-green-500"
/>

<SummaryCard
title="Total Expense"
value={summary.total_expense}
color="bg-red-500"
/>

<SummaryCard
title="Balance"
value={summary.balance}
color="bg-blue-600"
/>

</div>

)
}


<form
onSubmit={handleSubmit}

className="
bg-white
rounded-xl
shadow-lg
p-6
mb-8
space-y-3
"
>

<input
className="
w-full
border
p-3
rounded
"
placeholder="Title"

value={form.title}

onChange={(e)=>
setForm({
...form,
title:e.target.value
})
}
/>

<input
className="
w-full
border
p-3
rounded
"
placeholder="Amount"

value={form.amount}

onChange={(e)=>
setForm({
...form,
amount:e.target.value
})
}
/>

<input
className="
w-full
border
p-3
rounded
"
placeholder="Category"

value={form.category}

onChange={(e)=>
setForm({
...form,
category:e.target.value
})
}
/>

<input
className="
w-full
border
p-3
rounded
"
placeholder="Type"

value={form.type}

onChange={(e)=>
setForm({
...form,
type:e.target.value
})
}
/>

<input
className="
w-full
border
p-3
rounded
"
placeholder="Description"

value={form.description}

onChange={(e)=>
setForm({
...form,
description:e.target.value
})
}
/>

<button
className="
bg-blue-600
text-white
px-5
py-3
rounded-lg
hover:bg-blue-700
"
>

Add Transaction

</button>

</form>


<h2 className="
text-3xl
font-bold
mb-4
">

Transactions

</h2>


<div className="space-y-4">

{
transactions.map((item)=>(

<TransactionCard
key={item.id}
item={item}
/>

))
}

</div>

</div>

</div>

)

}