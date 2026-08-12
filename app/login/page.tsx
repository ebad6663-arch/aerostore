"use client";


import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";



export default function LoginPage() {


const searchParams = useSearchParams();


const callbackUrl =
searchParams.get("callbackUrl") || "/";



const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");






async function handleCredentialsLogin(
e:React.FormEvent
){

e.preventDefault();


setLoading(true);

setError("");




await signIn(
"credentials",
{

username:email,

password,

redirect:false,

}
);




setLoading(false);


window.location.href =
callbackUrl;




}







return (


<main
className="
min-h-screen
flex
items-center
justify-center
bg-black
px-6
pt-24
"
>



<div
className="
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-white/[0.04]
p-8
shadow-2xl
backdrop-blur-xl
"
>



<div className="mb-8 text-center">


<h1 className="
font-display
text-4xl
tracking-tight
">


<span className="text-white">
Aero
</span>


<span className="text-orange-500">
Store
</span>


</h1>


<p className="
mt-3
text-sm
text-white/50
">

Sign in to continue shopping

</p>


</div>






<button

type="button"

onClick={()=>
signIn(
"google",
{
callbackUrl,
}
)
}

className="
h-12
w-full
rounded-full
border
border-white/10
bg-white/5
font-semibold
text-white
transition
hover:bg-white/10
"

>

Continue with Google

</button>








<div className="
my-7
flex
items-center
gap-4
">


<div className="
h-px
flex-1
bg-white/10
"/>


<span className="
text-xs
text-white/40
">

OR

</span>



<div className="
h-px
flex-1
bg-white/10
"/>


</div>








<form
onSubmit={handleCredentialsLogin}
>



<label className="
text-sm
text-white/70
">

Email

</label>



<input

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

type="email"

required

className="
mt-2
h-12
w-full
rounded-xl
border
border-white/10
bg-white/[0.05]
px-4
text-white
outline-none
focus:border-orange-500
"

/>







<label className="
mt-5
block
text-sm
text-white/70
">

Password

</label>




<input

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

type="password"

required

className="
mt-2
h-12
w-full
rounded-xl
border
border-white/10
bg-white/[0.05]
px-4
text-white
outline-none
focus:border-orange-500
"

/>







{
error && (

<p className="
mt-4
text-sm
text-red-400
">

{error}

</p>

)
}








<button

disabled={loading}

className="
mt-7
h-12
w-full
rounded-full
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








<p className="
mt-7
text-center
text-sm
text-white/50
">


Don&apos;t have an account?


<Link

href="/register"

className="
ml-1
text-orange-500
hover:text-orange-400
"

>

Register

</Link>


</p>





</div>


</main>


);


}