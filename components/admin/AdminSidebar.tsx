"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  FolderTree,
  UserRound,
} from "lucide-react";



const links = [

{
href:"/dashboard",
label:"Dashboard",
icon:LayoutDashboard,
},


{
href:"/dashboard/products",
label:"Products",
icon:Package,
},


{
label:"Collections",
 href:"/dashboard/categories",
icon:FolderTree,
},


{
href:"/dashboard/orders",
label:"Orders",
icon:ShoppingCart,
},


{
href:"/dashboard/team",
label:"Team",
icon:UserRound,
},


{
href:"/dashboard/settings",
label:"Store Settings",
icon:Settings,
},


];



export default function AdminSidebar(){


const pathname = usePathname();




return (


<aside

className="
sticky
top-0
flex
h-screen
w-72
shrink-0
flex-col
border-r
border-white/10
bg-[#090909]
"

>



{/* BRAND */}



<div

className="
border-b
border-white/10
px-7
py-8
"

>


<Link

href="/dashboard"

className="
text-3xl
font-black
tracking-tight
"

>


<span className="text-white">
Aero
</span>


<span className="text-orange-500">
Store
</span>


</Link>



<p

className="
mt-2
text-sm
text-white/40
"

>

Admin Control Center

</p>


</div>







{/* NAVIGATION */}



<nav

className="
flex-1
space-y-2
overflow-y-auto
p-5
"

>



{

links.map((item)=>{


const Icon = item.icon;



const active =
pathname === item.href ||
pathname.startsWith(item.href + "/");



return (


<Link

key={item.href}

href={item.href}

className={`

flex
items-center
gap-4
rounded-2xl
px-5
py-4
text-sm
font-semibold
transition

${
active

?

"bg-orange-500 text-black"

:

"text-white/50 hover:bg-white/5 hover:text-white"

}

`}

>


<Icon size={20}/>


{item.label}


</Link>


);


})


}



</nav>






{/* LOGOUT */}



<div

className="
border-t
border-white/10
p-5
"

>


<button

onClick={()=>signOut({

callbackUrl:"/admin/login"

})}


className="
flex
w-full
items-center
gap-4
rounded-2xl
px-5
py-4
font-semibold
text-red-400
transition
hover:bg-red-500/10
"

>


<LogOut size={20}/>


Logout


</button>


</div>





</aside>


);


}