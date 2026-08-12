import Link from "next/link";

import {
  Trash2,
  Pencil,
  FolderOpen,
  Plus,
} from "lucide-react";

import {
  getCategories,
  deleteCategory,
} from "@/lib/actions/categories";





export default async function CategoriesPage(){



const categories =
await getCategories();






return (



<div className="space-y-10">





{/* HEADER */}



<div className="
flex
items-center
justify-between
">



<div>


<p className="
text-xs
font-bold
uppercase
tracking-[0.3em]
text-orange-400
">

Collection Management

</p>




<h1 className="
mt-3
text-4xl
font-black
text-white
">

Categories

</h1>




<p className="
mt-2
text-neutral-400
">

Manage Anime and Cartoon collectibles.

</p>



</div>







<Link

href="/dashboard/categories/new"

className="
flex
items-center
gap-2
rounded-2xl
bg-orange-500
px-6
py-3
font-bold
text-black
transition
hover:bg-orange-400
"

>


<Plus size={18}/>

Add Category


</Link>




</div>









<div className="
overflow-hidden
rounded-3xl
border
border-white/10
bg-[#111]
">





<table className="
w-full
">





<thead className="
border-b
border-white/10
bg-[#181818]
">


<tr className="
text-left
text-xs
uppercase
tracking-wider
text-white/40
">


<th className="px-6 py-5">
Category
</th>


<th className="px-6 py-5">
Slug
</th>


<th className="px-6 py-5">
Products
</th>


<th className="px-6 py-5 text-right">
Actions
</th>



</tr>


</thead>







<tbody>





{

categories.length===0 ? (



<tr>


<td

colSpan={4}

className="
py-24
text-center
"

>



<FolderOpen

size={55}

className="
mx-auto
mb-5
text-neutral-600
"

/>




<h2 className="
text-xl
font-bold
text-white
">

No Categories Found

</h2>




<p className="
mt-2
text-neutral-500
">

Create Anime and Cartoon collections first.

</p>



</td>


</tr>




)

:

categories.map((category)=>(



<tr

key={category.id}

className="
border-b
border-white/5
transition
hover:bg-white/[0.03]
"

>




<td className="
px-6
py-5
">


<div>


<h3 className="
font-bold
text-white
">

{category.name}

</h3>




<p className="
mt-1
text-sm
text-neutral-500
">

{
category.description ??
"No description"
}

</p>



</div>


</td>







<td className="
px-6
py-5
text-neutral-400
">

{category.slug}


</td>







<td className="
px-6
py-5
">


<span className="
rounded-full
bg-orange-500/10
px-3
py-1
text-sm
font-bold
text-orange-400
">

{category._count.products}

</span>



</td>








<td className="
px-6
py-5
">


<div className="
flex
justify-end
gap-3
">





<Link

href={`/dashboard/categories/${category.id}/edit`}

className="
rounded-xl
border
border-blue-500/20
bg-blue-500/10
p-2
text-blue-400
transition
hover:bg-blue-500
hover:text-white
"

>


<Pencil size={18}/>


</Link>









<form

action={async()=>{

"use server";

await deleteCategory(category.id);

}}

>



<button

type="submit"

className="
rounded-xl
border
border-red-500/20
bg-red-500/10
p-2
text-red-400
transition
hover:bg-red-500
hover:text-white
"

>


<Trash2 size={18}/>


</button>



</form>





</div>


</td>







</tr>



))


}





</tbody>





</table>






</div>






</div>



);


}