"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import useCart from "@/hooks/useCart";


interface Props {
  onClose: () => void;
}


export default function CartDrawerSummary({
  onClose,
}: Props) {


const {
subtotal,
clearCart,
}=useCart();



return (

<div className="space-y-4">


<div
className="
flex
items-center
justify-between
"
>

<span
className="
text-sm
uppercase
tracking-[0.2em]
text-white/50
"
>
Subtotal
</span>


<span
className="
text-2xl
font-black
text-orange-400
"
>
PKR {Number(subtotal).toLocaleString()}
</span>


</div>



<Link

href="/checkout"

onClick={onClose}

className="
group
flex
h-14
items-center
justify-center
gap-2
rounded-xl
bg-orange-500
font-bold
text-black
transition
hover:bg-orange-400
"

>

Proceed to Checkout


<ArrowRight

size={18}

className="
transition
group-hover:translate-x-1
"

/>


</Link>



<button

type="button"

onClick={clearCart}

className="
h-12
w-full
rounded-xl
border
border-white/10
text-sm
font-semibold
text-white/60
transition
hover:border-red-500/40
hover:text-red-400
"

>

Clear Bag

</button>


</div>

);

}