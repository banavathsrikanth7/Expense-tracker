"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log({ name, email, password });
  
  try {
    await login({ email, password });
    router.push("/dashboard");
  } catch (error) {
    alert("Invalid credentials");
  }
    setName("");
    setEmail("");
    setPassword("");
  };
  

const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  } catch (error) {
    alert(error.message);
  }
};


  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-100 to-white px-4">
      
      
      <div className="flex flex-col items-center w-full max-w-md">
        
        
        <h1 className="text-4xl font-extrabold md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-center mb-8">
          Welcome to Expense Tracker 
        </h1>

        
        <div className="bg-white p-6 rounded-xl shadow-md bg-gradient-to-br from-slate-400 via-purple-300 to-slate-400 w-full">
          <h2 className="text-2xl font-bold text-center text-black mb-4">
           Enter your Login Credentials
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
              className="bg-blue-600 w-full  text-white p-2 rounded-3xl hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full border flex items-center justify-center gap-2 p-2 rounded hover:bg-gray-100"
>
  <span>🔵</span>
  <span>Continue with Google</span>
</button>

            

            <p className="text-center text-sm text-black">
              Don't have an account?<Link href="/register" className="text-blue-900 text-lg hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
