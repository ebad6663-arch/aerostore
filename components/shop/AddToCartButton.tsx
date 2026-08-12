"use client";


import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";


import type { Product } from "@/types/product";



interface Props {

product: Product;

}



export default function AddToCartButton({
product,
}:Props){



const {
addToCart,
}=useCartContext();



const {
data:session,
status,
}=useSession();



const router = useRouter();



const soldOut =
product.stock <= 0;





function handleAddToCart(){



if(status==="loading"){

return;

}





if(!session?.user){


router.push(
`/login?callbackUrl=${encodeURIComponent(
`/products/${product.slug}`
)}`
);


return;


}





if(!soldOut){


addToCart(product);


}



}






return (


<Button


disabled={
soldOut ||
status==="loading"
}


onClick={handleAddToCart}


className="
mt-10
flex
h-14
w-full
items-center
justify-center
gap-3
rounded-full
bg-orange-500
px-10
font-bold
text-black
transition
hover:bg-orange-400
disabled:cursor-not-allowed
disabled:bg-white/10
disabled:text-white/40
"


>



<ShoppingBag size={18}/>



{

soldOut

?

"Out of Stock"

:

"Add To Cart"

}



</Button>


);


}