"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signup } from "@/lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, password });
   try {
    // Call the signup API endpoint
    await signup({ name, email, password });
    router.push("/login");
  } catch (error) {
    alert(error.message);
  }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-100 to-white px-4">
      
      
      <div className="flex flex-col items-center w-full max-w-md">
        
       
        <h1 className="text-4xl font-extrabold md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center mb-8">
          Welcome to Expense Tracker 
        </h1>

       
        <div className="bg-gradient-to-br from-purple-300 via-pink-400 to-slate-300 p-6 rounded-xl shadow-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm m-1 font-medium">Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border-2 border-violet-950 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm m-1 font-medium">Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border-2 border-violet-950 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm m-1 font-medium">Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border-2 border-violet-950 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 w-full text-white p-2 rounded-3xl hover:bg-green-700 transition"
            >
              Register
            </button>

            <p className="text-center text-sm text-black">
              Already have an account?<Link href="/login" className="text-blue-900 text-lg hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}