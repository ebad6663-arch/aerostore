"use client";


import Image from "next/image";
import Link from "next/link";


import { Button } from "@/components/ui/button";


import type { Product } from "@/types/product";


import { useCartContext } from "@/context/CartContext";




interface Props {
  product: Product;
}




export function ProductCard({
  product,
}: Props) {



const {
  addToCart,
} = useCartContext();




const soldOut = product.stock <= 0;



const image =
product.images?.[0]?.url ??
"/placeholder.png";






return (



<article


className="
group
overflow-hidden
rounded-3xl
border
border-border
bg-card
p-4
transition-all
duration-500
hover:-translate-y-2
hover:border-orange-500/40
"


>




<Link


href={`/products/${product.slug}`}


className="block"


>




<div


className="
relative
overflow-hidden
rounded-2xl
bg-black
"


>




<Image


src={image}


alt={`${product.name} premium collectible from AERO Store`}


width={600}


height={600}


className="
aspect-square
w-full
object-contain
transition
duration-700
group-hover:scale-110
"


/>






{soldOut && (



<span


className="
absolute
left-4
top-4
rounded-full
bg-red-500
px-3
py-1
text-xs
font-bold
text-white
"


>


Sold Out


</span>



)}





</div>




</Link>








<div className="mt-5 space-y-4">




<div


className="
flex
items-start
justify-between
gap-4
"


>



<div>



<Link


href={`/products/${product.slug}`}


className="
font-bold
text-white
transition
hover:text-orange-400
"


>


{product.name}


</Link>




<p


className="
mt-2
text-[11px]
uppercase
tracking-[0.2em]
text-white/40
"


>


{product.category?.name ?? "Collectible"}


</p>




</div>






<p


className="
shrink-0
font-black
text-orange-400
"


>


PKR {Number(product.price).toLocaleString()}


</p>




</div>








<Button



disabled={soldOut}



onClick={(e)=>{


e.preventDefault();


if(!soldOut){

addToCart(product);

}


}}



className="
h-11
w-full
rounded-full
bg-orange-500
font-bold
text-black
transition
hover:bg-orange-400
disabled:bg-white/10
disabled:text-white/40
"


>



{


soldOut


?


"Unavailable"


:


"Add To Bag"


}




</Button>






</div>






</article>



);



}