import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import AdminSidebar from "@/components/admin/AdminSidebar";



export default async function DashboardLayout({

children,

}:{

children:React.ReactNode;

}) {



const session = await auth();





if(!session?.user){

redirect("/admin/login");

}




if(session.user.email !== "admin@local"){

redirect("/");

}





return (



<div

className="
flex
min-h-screen
bg-[#080808]
text-white
"

>



<AdminSidebar />




<main

className="
flex-1
overflow-y-auto
p-6
md:p-10
"

>


<div

className="
mx-auto
max-w-7xl
"

>

{children}

</div>



</main>




</div>


);


}