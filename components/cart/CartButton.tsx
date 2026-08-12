"use client";

import {
  ShoppingBag,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import useCart from "@/hooks/useCart";


interface Props {

  onClick: () => void;

}



export default function CartButton({

  onClick,

}: Props) {


const {
  totalItems,
  loading,
} = useCart();




return (


<motion.button


type="button"


whileHover={{
  y:-2,
}}


whileTap={{
  scale:.95,
}}


onClick={onClick}


aria-label="Open shopping bag"


className="
relative
flex
h-11
w-11
items-center
justify-center
rounded-full
border
border-white/10
bg-[#111]
text-white/70
transition
hover:border-orange-500/40
hover:text-white
"


>



<ShoppingBag

size={20}

/>




<AnimatePresence>


{

!loading && totalItems > 0 && (

<motion.span


initial={{
  scale:0,
  opacity:0,
}}


animate={{
  scale:1,
  opacity:1,
}}


exit={{
  scale:0,
  opacity:0,
}}


transition={{

type:"spring",

stiffness:450,

damping:25,

}}


className="
absolute
-right-1
-top-1
flex
h-5
min-w-5
items-center
justify-center
rounded-full
bg-orange-500
px-1
text-[10px]
font-black
text-black
"


>

{totalItems}


</motion.span>


)

}


</AnimatePresence>



</motion.button>


);


}