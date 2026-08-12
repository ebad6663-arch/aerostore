"use client";


import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";



export default function AdminLoginPage() {



const [username,setUsername] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);






async function handleAdminLogin(
e:React.FormEvent
){



e.preventDefault();


setLoading(true);





const result =
await signIn(
"admin",
{

username,

password,

redirect:false,

}

);







if(result?.error){


toast.error(
"Login Failed",
{

description:
"Please check your admin username and password and try again.",

}
);


setLoading(false);


return;


}






window.location.href =
"/dashboard";



}







return (



<div
className="
min-h-screen
flex
items-center
justify-center
bg-black
px-6
text-white
"
>



<div
className="
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-white/5
p-8
"
>



<Link

href="/"

className="
block
text-center
text-4xl
font-black
"

>


Aero

<span className="text-orange-500">
Store
</span>


</Link>







<h1
className="
mt-8
text-center
text-3xl
font-bold
"
>

Admin Portal

</h1>







<form

onSubmit={handleAdminLogin}

className="
mt-10
space-y-5
"

>





<input


value={username}


onChange={(e)=>
setUsername(e.target.value)
}


placeholder="Username"


className="
h-12
w-full
rounded-xl
bg-black
border
border-white/10
px-4
outline-none
focus:border-orange-500
"

/>






<input


type="password"


value={password}


onChange={(e)=>
setPassword(e.target.value)
}


placeholder="Password"


className="
h-12
w-full
rounded-xl
bg-black
border
border-white/10
px-4
outline-none
focus:border-orange-500
"

/>








<button


disabled={loading}


className="
h-12
w-full
rounded-xl
bg-orange-500
font-bold
text-black
transition
hover:bg-orange-400
disabled:opacity-50
"

>


{

loading

?

"Signing in..."

:

"Sign In"

}



</button>







</form>





</div>





</div>



);


}