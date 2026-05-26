/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import ExpenseChart from "../../components/ExpenseChart";
import Navbar from "../../components/Navbar";
import SummaryCard from "../../components/SummaryCard";
import TransactionCard from "../../components/TransactionCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getProfile, getSummary, getTransactions, addTransaction, deleteTransaction, exportTransactions, updateTransaction} from "@/lib/api";


export default function DashboardPage() {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        type: "",
        description: "",
        is_recurring:false,
        recurring_type:""
    });
    const [profile, setProfile] = useState(null);
    const [summary, setSummary] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [selectedDate,setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingItem, setEditingItem] = useState(null);
    const [page, setPage] = useState(1);
    const [searchInput,setSearchInput]=useState("");


    const itemsPerPage = 5;

//handle delete and edit
    async function handleDelete(id) {
        try{
        await deleteTransaction(id);
       toast.success("Transaction deleted");
       loadData();
    }
    catch(error){
        console.log("Delete Error:",error);
        toast.error("Failed to delete transaction. Please try again.");
    }}

   function handleEdit(item) {
    setEditingItem(item);
    setForm({
        title: item.title || "",
        amount: item.amount || "",
        category: item.category || "",
        type: item.type || "",
        description: item.description || "",
    });}
    function handleSearch(){

     setSearch(
    searchInput
       );

      setPage(1);}
 //load data
    async function loadData() {
       try {
           setLoading(true);
   const [profileData, summaryData, transactionData]
     = await Promise.all([ getProfile(),getSummary(),getTransactions() ]);
    setProfile(profileData);
    console.log(
"profileData:",
profileData
);
    setSummary(summaryData);           
    setTransactions( Array.isArray(transactionData) ?
          transactionData:[] );
        console.log(
"transactionData:",
transactionData
); }
     catch(error){
         console.log(
                "Dashboard Error:",  error ); }
        finally{
            setLoading(false);
        }
    }
    //protected route logic
   useEffect(() => {
    const token =
        localStorage.getItem("token" );
    if(!token){
        router.push( "/login");
        return;
    }
    loadData(); }, []);
//handle submit 
    async function handleSubmit(e){
        e.preventDefault();
    try {
        let result ;
        if(editingItem){
        result = await updateTransaction(  editingItem.id, form );
        setEditingItem(null);
        toast.success("Transaction updated successfully!");
          } 
          else{
             result =   await addTransaction(form);
              toast.success("Transaction added successfully!");
          }
        console.log(result);
        setForm({
            title:"",
            amount:"",
            category:"",
            type:"",
            description:""
        });
       await loadData();
    }
    catch(error){
        console.log("Submit Error:",error);
        toast.error("An error occurred. Please try again.");}}
// filtering, pagination and summary logic
    const filtered =
    transactions.filter(item=>{
    const matchesSearch = item.title?.toLowerCase().includes( search.toLowerCase());
    const matchesFilter = filter==="all"|| item.type===filter;
    const matchesDate =  !selectedDate ||item.created_at ?.slice(0,10) === selectedDate;
    return( matchesSearch&&matchesFilter&&matchesDate);
});
// page 
    const startIndex= (page-1)* itemsPerPage;
    const currentTransactions =
    filtered.slice(startIndex, startIndex + itemsPerPage );
    const totalPages= Math.ceil(filtered.length/ itemsPerPage );

  // summary logic  
    const recentTransactions=   [...transactions] .reverse() .slice(0,5);
    const totalMonthlyExpense= transactions.filter( item => item.type==="expense" ).reduce( (sum,item)=> sum+Number(item.amount), 0 );
    const categoryTotals={};
    transactions.forEach(item=>{
    if(item.category){
    categoryTotals[item.category]=( categoryTotals[ item.category ]|| 0 )+Number(item.amount); } });
   const topCategory=Object.keys(categoryTotals).length ? Object.keys(categoryTotals).reduce((a,b)=>
    categoryTotals[a]> categoryTotals[b] ? a : b ) : "None";

       // budget logic
const [budget,setBudget] = useState(5000);

useEffect(()=>{ const storedBudget = localStorage.getItem("budget");
if(storedBudget){
    setBudget(Number(storedBudget));
} },[] );

useEffect(()=>{
    localStorage.setItem(
        "budget",budget);
},[budget]);

const remainingBudget =budget - totalMonthlyExpense;
const budgetPercent =Math.min((totalMonthlyExpense / budget)*100,100);

    if(loading){
        return(
            <div className="h-screen flex items-center justify-center text-3xl font-bold">
                Loading...
            </div>
        )}

return(
<div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-900 dark:to-black dark:text-white">
<Navbar/>

<div className="p-6 max-w-6xl mx-auto">
{/*}
<div className="mb-6">

<button onClick={exportTransactions} className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800">
Download Report
</button>

</div>*/}
{/* profile section*/}
{profile && (

<div className="
bg-gradient-to-r
from-yellow-500
via-orange-500
to-red-500
text-white
rounded-3xl
shadow-xl
p-8
mb-8
-mr-3
-ml-3
hover:scale-[1.02]
transition-all
duration-300
">

<p className="
text-sm
opacity-90
mb-2
">

Track smarter • Spend wiser

</p>

<h2 className="
text-3xl
md:text-4xl
font-extrabold
">
Good to see you 👋
{
profile?.user?.name
||
profile?.user?.sub?.split("@")[0]
||
"User"
}

</h2>

<p className="
mt-3
text-white/80
">
Ready to manage your expenses today?
</p>
</div>
)}
{/* summary section*/}
{summary && (
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
<SummaryCard title="💰Income"
value={summary.total_income}
 />

<SummaryCard title="📉Expense"
value={summary.total_expense}
/>

<SummaryCard title="🏦Balance"
value={summary.balance}
 />
</div>
)}
{/* monthly budget*/}
<div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-500">
<h2 className="text-2xl font-bold mb-4"> Monthly Budget </h2>
<input type="number" value={budget} onChange={(e)=> setBudget(e.target.value)} className="border p-3 rounded w-full mb-4" />
<div className="
w-full
bg-gray-300
rounded-xl
h-6
overflow-hidden
mt-4
">

<div

style={{
width:`${budgetPercent}%`
}}

className="
h-full
bg-gradient-to-r
from-green-400
via-blue-500
to-purple-500
transition-all
duration-700
rounded-xl
flex
items-center
justify-center
text-black
text-sm
font-bold
">
{budgetPercent>5 && `${Math.round(budgetPercent)}%`}

</div>

</div>
<p className="mt-4 text-xl font-bold"> Remaining:₹ {remainingBudget} </p>
{
remainingBudget<0 && (
<p className="text-red-500 font-bold mt-2"> ⚠ Budget Exceeded </p>
)}</div>

{/* expense breakdown chart*/}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-white p-6 dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg transition-all duration-500">
<h2 className="font-bold text-xl">
Monthly Expense
</h2>
<p className="text-3xl mt-3 text-red-500">₹ {totalMonthlyExpense}</p>
</div>
<div className="bg-white p-6 dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg transition-all duration-500">

<h2 className="font-bold text-xl">Top Category</h2>

<p className="text-3xl mt-3 text-blue-500">
{topCategory} </p>
</div>

<div className="bg-white dark:bg-gray-800  dark:text-white p-6 rounded-xl shadow-lg">

<h2 className="font-bold text-xl">
Recent Activity
</h2>

<p className="text-3xl mt-3 text-green-500">
{recentTransactions.length}
</p>
</div>
</div>
{/*transactions */}
{
transactions.length>0 && (
<div className="mb-8 ">
<ExpenseChart transactions={transactions} />
</div>
)}
{/* transaction list*/}
<div className="
grid
md:grid-cols-3
items-center
bg-gradient-to-r
from-slate-300
to-blue-300
rounded-2xl
shadow-lg
gap-4
mb-6
p-5
"> <div className="
text-black
font-bold
text-xl
md:col-span-1
">

🔍 Search Any Transaction

</div>
<input placeholder="Search by title..."
value={searchInput}
onChange={(e)=>
setSearchInput(e.target.value)
}
className="w-full
p-3
border
rounded-xl
outline-none
focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
/>

<input
type="date"
value={selectedDate}
onChange={(e)=> {setSelectedDate(e.target.value); setPage(1)}}
className="border p-3 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
/>

<select
value={filter}
onChange={(e)=> {setFilter( e.target.value); setPage(1)}}
className="border p-3 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"

>
<option value="all">
All
</option>

<option value="income">
Income
</option>

<option value="expense">
Expense
</option> </select>
<button

className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
hover:bg-blue-700
hover:scale-100
transition
duration-300
"
onClick={
handleSearch
}

>

Search

</button>
</div>

<form
onSubmit={handleSubmit}
className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg p-6 mb-8 space-y-4 transition-all duration-500"
><div className="
grid
md:grid-cols-3
items-center
bg-gradient-to-r
from-slate-300
to-orange-300
rounded-2xl
shadow-lg
gap-4
mb-6
p-5
"> <div className="
text-black
font-bold
text-xl
md:col-span-1
">

💵 Add Transaction

</div></div>

<input
className="w-full border p-3 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
placeholder="Title"
value={form.title}
onChange={(e)=> setForm({...form,title:e.target.value})}
/>
<input
className="w-full border p-3 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
placeholder="Amount"
value={form.amount}
onChange={(e)=> setForm({ ...form,amount:e.target.value })}
/>
<input
className="w-full border p-3 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
className="w-full border p-3 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
className="w-full border p-3 rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
placeholder="Description"
value={form.description}
onChange={(e)=>
setForm({
...form,
description:e.target.value
})
}
/>

<label className="flex gap-2 items-center">

<input
type="checkbox"
checked={form.is_recurring}
onChange={(e)=>
setForm({
...form,
is_recurring:e.target.checked
})
}
/>
Recurring Transaction
</label>

{
form.is_recurring && (
<select
value={form.recurring_type}
onChange={(e)=>
setForm({
...form,
recurring_type:e.target.value
})
}
className="border p-3 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
>
<option value="">
Select Frequency
</option>
<option value="weekly">
Weekly
</option>
<option value="monthly">
Monthly
</option>
</select> )}
<button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
{
editingItem ? "Update Transaction": "Add Transaction"
}
</button>
</form>
<h2 className="text-3xl font-bold mb-4">
Transactions
</h2>
<div className="space-y-4">
{
currentTransactions.length===0?
<div className="bg-white dark:bg-gray-800 dark:text-white  rounded-xl p-10 text-center shadow">
No Transactions Yet 🚀
</div>
:
currentTransactions.map(item=>(
<TransactionCard
key={item.id}
item={item}
onDelete={handleDelete}
onEdit={handleEdit}
/> )) }
</div>
{/* pagination */}
<div className="flex justify-center gap-4 mt-8">
<button
disabled={page===1}
onClick={()=>
setPage(
Math.max(page-1,1) )}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Previous
</button>
<p className="font-bold">
Page {page} of {totalPages}
</p>
<button
disabled={page===totalPages}
onClick={()=>
setPage(
Math.min(
page+1,
totalPages ) )}
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Next
</button>
</div>
</div>
</div>

)}