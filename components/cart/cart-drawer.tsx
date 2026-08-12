"use client";

import {
Sheet,
SheetContent,
SheetHeader,
SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";

import { useCartContext } from "@/context/CartContext";


interface Props {
open:boolean;
setOpen:(value:boolean)=>void;
}


export default function CartDrawer({
open,
setOpen,
}:Props){


const {
cart,
removeFromCart,
subtotal,
}=useCartContext();



return (

<Sheet
open={open}
onOpenChange={setOpen}
>


<SheetContent
side="right"
className="
bg-black
border-white/10
text-white
w-[420px]
"
>


<SheetHeader>

<SheetTitle
className="text-white text-2xl"
>
Your Cart
</SheetTitle>

</SheetHeader>



<div
className="
mt-8
space-y-5
"
>


{
cart.length === 0 ? (

<p className="text-white/50">
Your cart is empty
</p>

)

:

cart.map(item=>(


<div
key={item.id}
className="
flex
gap-4
border-b
border-white/10
pb-4
"
>


<Image
src={
item.images?.[0]?.url ??
"/placeholder.png"
}
alt={item.name}
width={70}
height={70}
className="rounded-xl object-cover"
/>



<div className="flex-1">

<h3 className="font-semibold">
{item.name}
</h3>


<p className="text-orange-400">
PKR {Number(item.price).toLocaleString()}
</p>



<button
onClick={()=>
removeFromCart(item.id)
}
className="
text-xs
text-red-400
mt-2
"
>

Remove

</button>


</div>


</div>


))

}



</div>



<div
className="
absolute
bottom-6
left-6
right-6
"
>


<div className="
flex
justify-between
mb-4
text-lg
"
>

<span>
Total
</span>


<span className="text-orange-400">
PKR {subtotal.toLocaleString()}
</span>


</div>



<a
href="/checkout"
className="
block
rounded-full
bg-orange-500
py-3
text-center
font-bold
text-black
"
>

Checkout

</a>


</div>



</SheetContent>


</Sheet>


);

}