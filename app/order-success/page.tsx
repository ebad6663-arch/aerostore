import Link from "next/link";

import {
CheckCircle2,
Package,
Truck,
Clock3,
} from "lucide-react";



export default function OrderSuccessPage(){



return (


<main className="
min-h-screen
bg-background
px-6
pb-24
pt-36
text-foreground
">



<section className="shell flex justify-center">





<div className="
w-full
max-w-3xl
rounded-3xl
border
border-border
bg-card
p-10
text-center
">





<div className="
mx-auto
flex
h-28
w-28
items-center
justify-center
rounded-full
bg-green-500/10
">


<CheckCircle2

size={70}

className="text-green-400"

/>


</div>






<p className="
mt-8
text-xs
font-bold
uppercase
tracking-[0.3em]
text-accent
">

Order Confirmed

</p>






<h1 className="
mt-5
text-5xl
font-black
tracking-tight
">

Thank You For Your Order!

</h1>






<p className="
mx-auto
mt-6
max-w-xl
text-lg
leading-8
text-muted-foreground
">


Your order has been placed successfully.
Our team will contact you shortly to confirm
your Cash on Delivery order before dispatch.


</p>







<div className="
mt-10
grid
gap-5
md:grid-cols-3
">





<div className="
rounded-3xl
border
border-border
bg-background
p-6
">


<Package

size={30}

className="
mx-auto
mb-4
text-accent
"

/>



<h3 className="font-bold">

Payment

</h3>



<p className="
mt-2
text-sm
text-muted-foreground
">

Cash on Delivery

</p>


</div>







<div className="
rounded-3xl
border
border-border
bg-background
p-6
">



<Truck

size={30}

className="
mx-auto
mb-4
text-accent
"

/>




<h3 className="font-bold">

Delivery

</h3>



<p className="
mt-2
text-sm
text-muted-foreground
">

Karachi: 1–2 Days
<br/>
Other Cities: 3–5 Days

</p>


</div>







<div className="
rounded-3xl
border
border-border
bg-background
p-6
">



<Clock3

size={30}

className="
mx-auto
mb-4
text-green-400
"

/>




<h3 className="font-bold">

Order Status

</h3>



<p className="
mt-2
text-sm
text-muted-foreground
">

Awaiting Confirmation

</p>


</div>






</div>









<div className="
mt-10
rounded-3xl
border
border-orange-500/20
bg-orange-500/10
p-6
">


<p className="
leading-7
text-orange-200
">


Our team will contact you within a few hours
to verify your order. Keep your phone available
so we can process your shipment quickly.


</p>


</div>








<div className="
mt-10
flex
flex-col
gap-4
sm:flex-row
">



<Link

href="/orders"

className="
flex-1
rounded-2xl
bg-orange-500
px-8
py-4
font-bold
text-black
transition
hover:bg-orange-400
"

>

View My Orders

</Link>






<Link

href="/products"

className="
flex-1
rounded-2xl
border
border-border
bg-background
px-8
py-4
font-bold
transition
hover:bg-white/5
"

>

Continue Shopping

</Link>



</div>







</div>





</section>




</main>


);


}