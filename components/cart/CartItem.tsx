"use client";

import Image from "next/image";

import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import useCart from "@/hooks/useCart";

import type {
  CartItem as CartItemType,
} from "@/types/cart";



interface Props {

  item: CartItemType;

}



export default function CartItem({
  item,
}: Props) {


const {

  increaseQuantity,

  decreaseQuantity,

  removeFromCart,

}=useCart();




const image =
item.images?.[0]?.url ??
"/placeholder-product.png";



return (


<div

className="
flex
gap-5
rounded-2xl
border
border-white/10
bg-white/[0.02]
p-4
"

>




{/* IMAGE */}


<div

className="
relative
h-28
w-28
shrink-0
overflow-hidden
rounded-2xl
bg-[#181818]
"

>


<Image

src={image}

alt={item.name}

fill

sizes="112px"

className="
object-contain
p-3
"

/>


</div>







{/* CONTENT */}



<div

className="
flex
min-w-0
flex-1
flex-col
"

>


<p

className="
text-[10px]
font-semibold
uppercase
tracking-[0.3em]
text-orange-400
"

>

{item.category?.name ?? "Collectible"}

</p>





<h3

className="
mt-2
line-clamp-2
text-lg
font-black
leading-tight
tracking-tight
text-white
"

>

{item.name}

</h3>





<p

className="
mt-3
font-bold
text-white
"

>

PKR {Number(item.price).toLocaleString()}

</p>






<div

className="
mt-5
flex
items-center
justify-between
"

>




{/* QUANTITY */}


<div

className="
flex
items-center
overflow-hidden
rounded-full
border
border-white/10
"

>



<button

type="button"

onClick={() =>
decreaseQuantity(item.id)
}

className="
flex
h-9
w-9
items-center
justify-center
text-white/60
transition
hover:bg-white/10
hover:text-white
"

aria-label="Decrease quantity"

>

<Minus size={14}/>

</button>




<span

className="
flex
w-10
justify-center
text-sm
font-bold
text-white
"

>

{item.quantity}

</span>





<button

type="button"

onClick={() =>
increaseQuantity(item.id)
}

className="
flex
h-9
w-9
items-center
justify-center
text-white/60
transition
hover:bg-white/10
hover:text-white
"

aria-label="Increase quantity"

>

<Plus size={14}/>

</button>



</div>







{/* REMOVE */}



<button

type="button"

onClick={() =>
removeFromCart(item.id)
}

aria-label="Remove item"

className="
flex
h-9
w-9
items-center
justify-center
rounded-full
border
border-white/10
text-white/40
transition
hover:border-red-500/40
hover:text-red-400
"

>

<Trash2 size={15}/>

</button>




</div>



</div>




</div>


);


}