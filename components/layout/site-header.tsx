"use client";


import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";


import {
  Menu,
  LogIn,
  LogOut,
} from "lucide-react";


import CartButton from "@/components/cart/CartButton";
import CartDrawerClient from "@/components/cart/CartDrawerClient";





const links = [

{
href:"/",
label:"Home",
},

{
href:"/products",
label:"Shop",
},

{
href:"/collections",
label:"Collections",
},

{
href:"/about",
label:"About",
},

{
href:"/contact",
label:"Contact",
},

];








export function SiteHeader(){



const [menuOpen,setMenuOpen] = useState(false);

const [cartOpen,setCartOpen] = useState(false);



const {
data:session,
status,
}=useSession();







return (


<>


<header
className="
fixed
top-4
left-1/2
z-50
w-[92%]
max-w-6xl
-translate-x-1/2
rounded-full
border
border-white/10
bg-black/70
backdrop-blur-2xl
shadow-[0_20px_60px_rgba(0,0,0,.45)]
"
>


<div
className="
flex
items-center
justify-between
gap-6
px-7
py-4
"
>





<Link
href="/"
className="
shrink-0
text-3xl
font-black
tracking-[-0.06em]
"
>

<span className="text-white">
Aero
</span>

<span className="text-orange-500">
Store
</span>


</Link>








<nav
className="
hidden
items-center
gap-8
md:flex
"
>

{

links.map((link)=>(

<Link

key={link.href}

href={link.href}

className="
text-sm
font-medium
text-white/60
transition
hover:text-white
"

>

{link.label}

</Link>

))

}


</nav>









<div
className="
flex
items-center
gap-3
"
>







{
status === "authenticated" && session?.user ? (


<Link

href="/orders"

className="
hidden
items-center
gap-3
md:flex
"

>


{
session.user.image && (

<Image

src={session.user.image}

alt="Profile"

width={38}

height={38}

className="
rounded-full
border
border-white/20
"

/>

)

}


<span className="
max-w-[120px]
truncate
text-sm
text-white/80
">

{
session.user.name ?? "Account"
}

</span>



</Link>


)
:

(

<Link

href="/login"

className="
hidden
items-center
gap-2
rounded-full
border
border-white/10
px-5
py-2
text-sm
font-semibold
text-white
transition
hover:border-orange-500
hover:text-orange-400
md:flex
"

>

<LogIn size={16}/>

Login

</Link>


)

}








<CartButton

onClick={()=>setCartOpen(true)}

/>









<Sheet

open={menuOpen}

onOpenChange={setMenuOpen}

>


<SheetTrigger asChild>


<Button

variant="ghost"

size="icon"

className="
text-white
md:hidden
"

>

<Menu/>

</Button>


</SheetTrigger>







<SheetContent

side="right"

className="
border-white/10
bg-black
text-white
"

>


<div
className="
mt-10
flex
flex-col
"
>


{

links.map((link)=>(


<Link

key={link.href}

href={link.href}

onClick={()=>setMenuOpen(false)}

className="
border-b
border-white/10
py-5
text-xl
"

>

{link.label}

</Link>


))

}







{
session?.user ? (


<>


<Link

href="/orders"

className="
border-b
border-white/10
py-5
text-xl
"

>

Orders

</Link>



<button
onClick={async()=>{
await signOut({
callbackUrl:"/"
});
window.location.reload();
}}

className="
flex
items-center
gap-3
py-5
text-xl
text-red-400
"

>

<LogOut size={20}/>

Logout


</button>


</>


)
:

(

<Link

href="/login"

className="
flex
items-center
gap-3
py-5
text-xl
text-orange-400
"

>

<LogIn/>

Login


</Link>


)

}



</div>



</SheetContent>


</Sheet>





</div>



</div>


</header>






<CartDrawerClient

open={cartOpen}

onClose={()=>setCartOpen(false)}

/>



</>


);


}