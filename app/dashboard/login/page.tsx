"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin(){

const router = useRouter();

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");


async function login(){

const res = await fetch("/api/admin-login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
password
})
});


if(res.ok){
router.push("/dashboard");
}else{
setError("Wrong username or password");
}

}


return (

<div className="min-h-screen bg-black flex items-center justify-center">

<div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">

<h1 className="text-3xl text-white mb-8">
Aero Admin
</h1>


<input
placeholder="Username"
className="w-full mb-4 rounded-xl bg-white/10 p-4 text-white"
onChange={(e)=>setUsername(e.target.value)}
/>


<input
type="password"
placeholder="Password"
className="w-full mb-4 rounded-xl bg-white/10 p-4 text-white"
onChange={(e)=>setPassword(e.target.value)}
/>


{error && (
<p className="text-red-500 mb-4">
{error}
</p>
)}


<button
onClick={login}
className="w-full rounded-full bg-orange-500 py-3 text-black"
>
Login
</button>


</div>

</div>

);

}