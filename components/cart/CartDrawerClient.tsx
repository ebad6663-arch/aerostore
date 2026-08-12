"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { X } from "lucide-react";

import { useEffect } from "react";

import useCart from "@/hooks/useCart";

import CartItem from "./CartItem";
import CartDrawerSummary from "./CartDrawerSummary";
import EmptyCart from "./EmptyCart";


interface Props {
  open: boolean;
  onClose: () => void;
}



export default function CartDrawerClient({
  open,
  onClose,
}: Props) {


const {
  cart,
} = useCart();



useEffect(()=>{

if(!open) return;


const handleKey = (e:KeyboardEvent)=>{

if(e.key==="Escape"){
onClose();
}

};


document.addEventListener(
"keydown",
handleKey
);


document.body.style.overflow="hidden";


return ()=>{

document.removeEventListener(
"keydown",
handleKey
);


document.body.style.overflow="";

};


},[open,onClose]);





return (

<AnimatePresence>


{open && (

<>


<motion.div

initial={{
opacity:0,
}}

animate={{
opacity:1,
}}

exit={{
opacity:0,
}}

onClick={onClose}

className="
fixed
inset-0
z-50
bg-black/70
backdrop-blur-sm
"

/>





<motion.aside

initial={{
x:"100%",
}}

animate={{
x:0,
}}

exit={{
x:"100%",
}}

transition={{
type:"spring",
stiffness:320,
damping:35,
}}

className="
fixed
right-0
top-0
z-[60]
flex
h-screen
w-full
max-w-[430px]
flex-col
border-l
border-white/10
bg-black
text-white
"

>



<div
className="
flex
items-center
justify-between
border-b
border-white/10
p-8
"
>


<div>

<p className="
text-xs
uppercase
tracking-widest
text-orange-500
">
Cart
</p>


<h2 className="
mt-2
text-3xl
font-black
">
Shopping Bag
</h2>


<p className="
mt-2
text-white/50
">
{cart.length} items
</p>


</div>



<button
onClick={onClose}
className="
rounded-full
border
border-white/10
p-3
"
>

<X size={18}/>

</button>


</div>





<div className="
flex-1
overflow-y-auto
p-8
">


{
cart.length===0

?

<EmptyCart />

:

<div className="space-y-6">

{
cart.map((item)=>(

<CartItem
key={item.id}
item={item}
/>

))
}

</div>

}


</div>





{
cart.length > 0 && (

<div className="
border-t
border-white/10
p-8
">

<CartDrawerSummary
onClose={onClose}
/>

</div>

)

}



</motion.aside>


</>


)}


</AnimatePresence>

);


}