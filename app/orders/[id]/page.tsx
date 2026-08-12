import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export default async function OrderDetailsPage({
params,
}: {
params: Promise<{ id: string }>;
}) {


const session = await auth();


if(!session?.user?.email){
redirect("/login");
}



const user = await prisma.user.findUnique({

where:{
email:session.user.email,
},

});


if(!user){
redirect("/login");
}



const { id } = await params;



const order = await prisma.order.findFirst({

where:{
id,
userId:user.id,
},

include: {

  items: {
    include: {
      product: true,
    },
  },

  payment: true,

  address: true,


},

});



if(!order){

redirect("/orders");

}



return (

<main
className="
min-h-screen
px-6
pt-32
pb-20
"
>

<div
className="
mx-auto
max-w-5xl
rounded-3xl
border
border-border
bg-card
p-8
"
>


<h1 className="
text-4xl
font-black
"
>
Order {order.orderNumber}
</h1>



<div className="mt-6 space-y-2">

<p>
Status: <b>{order.status}</b>
</p>

<p>
Date: {new Date(order.createdAt).toLocaleDateString()}
</p>

<p>
Total: PKR {Number(order.total).toLocaleString()}
</p>

</div>



<div className="
mt-10
"
>

<h2 className="
text-2xl
font-bold
"
>
Items
</h2>


<div className="
mt-5
space-y-4
"
>

{
order.items.map((item)=>(

<div
key={item.id}
className="
rounded-2xl
border
border-border
p-5
flex
justify-between
"
>


<div>

<p className="font-bold">
{item.product.name}
</p>

<p>
Quantity: {item.quantity}
</p>

</div>


<p className="font-bold">
PKR {Number(item.price).toLocaleString()}
</p>


</div>

))

}

</div>


</div>




{
order.address && (

<div className="mt-10">

<h2 className="text-2xl font-bold">
Shipping
</h2>


<p className="mt-3">
{order.address.fullName}
</p>

<p>
{order.address.phone}
</p>

<p>
{order.address.addressLine}, {order.address.city}, {order.address.province}
</p>


</div>

)
}




<Link

href="/orders"

className="
mt-10
inline-flex
rounded-full
bg-orange-500
px-6
py-3
font-bold
text-black
"

>

Back to Orders

</Link>



</div>

</main>

);

}