"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { PaymentMethod } from "@prisma/client";
import { toast } from "sonner";


import { createOrder } from "@/lib/actions/order";
import { syncCart } from "@/lib/actions/cart";

import useCart from "@/hooks/useCart";

import { pakistan } from "@/constants/pakistan";




export default function CheckoutPage(){



const {
cart,
subtotal,
loading,
}=useCart();



const router = useRouter();



const [placingOrder,setPlacingOrder]=useState(false);



const [fullName,setFullName]=useState("");
const [phone,setPhone]=useState("");
const [addressLine,setAddressLine]=useState("");
const [province,setProvince]=useState("");
const [city,setCity]=useState("");





const shipping =
city.toLowerCase()==="karachi"
?
250
:
city
?
400
:
0;



const total =
subtotal + shipping;







async function handlePlaceOrder(){



if(
!fullName ||
!phone ||
!addressLine ||
!province ||
!city
){


toast.error(
"Missing Information",
{

description:
"Please complete all checkout fields before placing your order."

}

);


return;


}







if(
!/^(\\+92|92|0)?3\d{9}$/.test(
phone.replace(/\s/g,"")
)

){



toast.error(
"Invalid Phone Number",
{

description:
"Please enter a valid Pakistani mobile number."

}

);



return;


}







try{



setPlacingOrder(true);





await syncCart(

cart.map(item=>({

productId:item.id,

quantity:item.quantity,

}))

);







await createOrder({

fullName,

phone,

addressLine,

city,

province,

paymentMethod:PaymentMethod.COD,

});






toast.success(
"Order Placed",
{

description:
"Your order has been received successfully."

}

);





router.push("/order-success");



}

catch(error){



console.error(error);




toast.error(
"Order Failed",
{

description:
error instanceof Error
?
error.message
:
"Something went wrong. Please try again."

}

);



}



finally{


setPlacingOrder(false);


}



}






if(loading){

return (

<div className="p-20 text-white">

Loading checkout...

</div>

);

}







return (

<main className="
min-h-screen
bg-background
px-6
pt-32
pb-20
">



<div className="
mx-auto
max-w-6xl
grid
gap-10
lg:grid-cols-2
">



<section className="
rounded-3xl
border
border-border
bg-card
p-8
">



<h1 className="
text-4xl
font-black
">

Checkout

</h1>





<div className="
mt-8
space-y-5
">



<input

value={fullName}

onChange={(e)=>
setFullName(e.target.value)
}

placeholder="Full Name"

className="
w-full
h-14
rounded-full
border
px-6
bg-background
"

/>





<input

value={phone}

onChange={(e)=>
setPhone(e.target.value)
}

placeholder="Phone Number"

className="
w-full
h-14
rounded-full
border
px-6
bg-background
"

/>






<select

value={province}

onChange={(e)=>{

setProvince(e.target.value);

setCity("");

}}

className="
w-full
h-14
rounded-full
border
px-6
bg-background
"

>


<option value="">
Select Province
</option>


{

Object.keys(pakistan).map((item)=>(

<option
key={item}
value={item}
>

{item}

</option>

))

}


</select>







<select

value={city}

disabled={!province}

onChange={(e)=>
setCity(e.target.value)
}

className="
w-full
h-14
rounded-full
border
px-6
bg-background
"

>


<option value="">
Select City
</option>


{

province &&

pakistan[
province as keyof typeof pakistan
].map((item)=>(

<option
key={item}
value={item}
>

{item}

</option>

))

}


</select>








<textarea

value={addressLine}

onChange={(e)=>
setAddressLine(e.target.value)
}

placeholder="Complete Address"

rows={5}

className="
w-full
rounded-3xl
border
p-6
bg-background
"

/>



</div>






<button

onClick={handlePlaceOrder}

disabled={placingOrder}

className="
mt-8
w-full
h-14
rounded-full
bg-orange-500
font-black
text-black
disabled:opacity-50
"

>

{

placingOrder

?

"Placing Order..."

:

"Place Order"

}


</button>



</section>








<section className="
rounded-3xl
border
border-border
bg-card
p-8
">


<h2 className="
text-3xl
font-black
">

Summary

</h2>




<div className="
mt-6
space-y-4
">


{

cart.map(item=>(


<div

key={item.id}

className="
flex
gap-4
items-center
"

>


<div className="
relative
h-16
w-16
">


<Image

src={
item.images?.[0]?.url ??
"/placeholder-product.png"
}

alt={item.name}

fill

className="object-cover rounded-xl"

/>


</div>




<div className="flex-1">


<p className="font-bold">

{item.name}

</p>


<p>

Qty {item.quantity}

</p>


</div>


</div>


))

}



</div>







<div className="
mt-8
border-t
pt-5
space-y-3
">


<p>
Subtotal: PKR {subtotal}
</p>


<p>
Shipping: PKR {shipping}
</p>


<h2 className="
text-2xl
font-black
">

Total: PKR {total}

</h2>


</div>





</section>





</div>



</main>

);



}