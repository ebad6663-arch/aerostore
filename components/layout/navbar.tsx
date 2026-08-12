"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Brand from "@/components/navbar/Brand";
import DesktopNav from "@/components/navbar/DesktopNav";
import SearchBar from "@/components/navbar/SearchBar";
import NavActions from "@/components/navbar/NavActions";
import MobileNav from "@/components/navbar/MobileNav";

import CartDrawerClient from "@/components/cart/CartDrawerClient";


export default function Navbar() {


const [mobileMenuOpen, setMobileMenuOpen] =
useState(false);


const [cartOpen, setCartOpen] =
useState(false);


const [scrolled, setScrolled] =
useState(false);




useEffect(()=>{


const handleScroll = ()=>{

setScrolled(window.scrollY > 12);

};


handleScroll();


window.addEventListener(
"scroll",
handleScroll
);


return ()=>{

window.removeEventListener(
"scroll",
handleScroll
);

};


},[]);





return (

<>


<div
className="
pointer-events-none
fixed
inset-x-0
top-0
z-40
flex
justify-center
"
>

<div
className="
h-[260px]
w-[800px]
rounded-full
bg-orange-500/[0.08]
blur-[200px]
"
/>

</div>






<header
className="
fixed
inset-x-0
top-5
z-50
flex
justify-center
px-6
"
>


<motion.div

initial={{
opacity:0,
y:-24,
}}

animate={{
opacity:1,
y:0,
}}

transition={{
duration:.6,
}}

className={`
transition-all
duration-500

${
scrolled
?
"w-full max-w-[1380px]"
:
"w-full max-w-[1320px]"
}

`}

>


<div

className={`
relative
flex
h-[74px]
items-center
rounded-full
border
border-white/[0.08]
px-8
backdrop-blur-3xl
transition-all
duration-500

${
scrolled
?
"bg-[#090909]/95"
:
"bg-[#090909]/85"
}

`}

>



<div
className="
flex
w-[210px]
shrink-0
"
>

<Brand />

</div>






<div
className="
hidden
flex-1
justify-center
lg:flex
"
>

<DesktopNav />

</div>







<div
className="
ml-auto
flex
items-center
gap-4
"
>


<div
className="
hidden
xl:block
"
>

<SearchBar />

</div>





<NavActions

onCartOpen={()=>setCartOpen(true)}

onMobileMenuOpen={()=>setMobileMenuOpen(true)}

/>



</div>





</div>


</motion.div>


</header>







<CartDrawerClient

open={cartOpen}

onClose={()=>setCartOpen(false)}

/>






<MobileNav

open={mobileMenuOpen}

onClose={()=>setMobileMenuOpen(false)}

/>



</>

);


}