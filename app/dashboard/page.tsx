import Link from "next/link";
import { Plus } from "lucide-react";


import DashboardStats from "@/components/dashboard/DashboardStats";
import LowStock from "@/components/dashboard/LowStock";
import RecentCustomers from "@/components/dashboard/RecentCustomers";
import RecentOrders from "@/components/dashboard/RecentOrders";


import { getDashboardStats } from "@/lib/actions/dashboard";




export default async function DashboardPage() {



const {
  stats,
  recentOrders,
  lowStockProducts,
  recentCustomers,

} = await getDashboardStats();






const formattedCustomers =
recentCustomers.map((customer)=>({


id:customer.id,


name:customer.name ?? "Customer",


email:customer.email ?? "",


phone:"",


instagram:"",


facebook:"",


whatsapp:"",


tiktok:"",


createdAt:customer.createdAt,


}));







const formattedOrders =
recentOrders.map((order)=>({


...order,


subtotal:Number(order.subtotal),


shipping:Number(order.shipping),


discount:Number(order.discount),


total:Number(order.total),


}));








const today = new Date().toLocaleDateString(
"en-PK",
{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric",

}
);







return (



<div className="space-y-8">





<div className="
flex
flex-col
gap-6
lg:flex-row
lg:items-center
lg:justify-between
">



<div>



<p className="
text-sm
uppercase
tracking-[0.25em]
text-orange-400
">

AeroStore Admin

</p>





<h1 className="
mt-3
text-4xl
font-black
text-white
">

Dashboard

</h1>





<p className="
mt-2
text-neutral-400
">

{today}

</p>



</div>







<Link

href="/dashboard/products/new"

className="
inline-flex
items-center
gap-2
rounded-2xl
bg-orange-500
px-6
py-3
font-semibold
text-white
transition
hover:bg-orange-600
"

>


<Plus size={18}/>

Add Product


</Link>



</div>









<DashboardStats


revenue={stats.revenue}


todayRevenue={stats.todayRevenue}


monthRevenue={stats.monthRevenue}


totalProducts={stats.totalProducts}


totalCustomers={stats.totalCustomers}


totalOrders={stats.totalOrders}


todayOrders={stats.todayOrders}


monthOrders={stats.monthOrders}


/>









<div className="
grid
gap-8
xl:grid-cols-3
">





<div className="
xl:col-span-2
">


<RecentOrders

orders={formattedOrders}

/>


</div>







<LowStock

products={lowStockProducts}

/>



</div>








<RecentCustomers

customers={formattedCustomers}

/>






</div>



);


}