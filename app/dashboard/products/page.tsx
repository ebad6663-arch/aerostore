import Link from "next/link";
import Image from "next/image";

import {
  Plus,
  Pencil,
  Trash2,
  Package,
  Star,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

import {
  deleteProduct,
  toggleFeaturedProduct,
} from "@/lib/actions/products";



export default async function ProductsPage(){



const products =
await prisma.product.findMany({

where:{
deletedAt:null,
},

include:{

category:true,

images:{
take:1,
orderBy:{
sortOrder:"asc",
},
},

},

orderBy:{
createdAt:"desc",
},

});







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

Product Management

</p>



<h1 className="
mt-3
text-4xl
font-black
text-white
">

Products

</h1>



<p className="
mt-2
text-neutral-400
">

Manage your anime and cartoon collectibles.

</p>


</div>





<Link

href="/dashboard/products/new"

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

Add Product

</Link>



</div>










{/* TABLE */}



<div className="
overflow-x-auto
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
Product
</th>


<th className="px-6 py-5">
Category
</th>


<th className="px-6 py-5">
Price
</th>


<th className="px-6 py-5">
Stock
</th>


<th className="px-6 py-5">
Featured
</th>


<th className="px-6 py-5">
Status
</th>


<th className="px-6 py-5 text-right">
Actions
</th>


</tr>


</thead>






<tbody>


{

products.length===0 ? (


<tr>


<td

colSpan={7}

className="
py-24
text-center
"

>


<Package

size={50}

className="
mx-auto
mb-5
text-white/20
"

/>



<h2 className="
text-xl
font-bold
text-white
">

No Products

</h2>



<p className="
mt-2
text-neutral-500
">

Add your first collectible.

</p>



</td>


</tr>



)

:

products.map((product)=>(



<tr

key={product.id}

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


<div className="
flex
items-center
gap-4
">



<div className="
relative
h-16
w-16
overflow-hidden
rounded-2xl
bg-[#181818]
">


<Image

src={
product.images[0]?.url ??
"/placeholder.png"
}

alt={product.name}

fill

className="object-cover"

/>


</div>





<div>


<h3 className="
font-bold
text-white
">

{product.name}

</h3>



<p className="
mt-1
text-xs
text-neutral-500
">

{product.sku}

</p>


</div>



</div>


</td>






<td className="
px-6
py-5
text-neutral-300
">

{
product.category?.name ??
"Uncategorized"
}

</td>







<td className="
px-6
py-5
font-bold
text-orange-400
">


PKR {Number(product.price).toLocaleString()}


</td>







<td className="px-6 py-5">


<span className={`
rounded-full
px-3
py-1
text-xs
font-bold

${
product.stock <= 5

?

"bg-red-500/20 text-red-400"

:

"bg-green-500/20 text-green-400"

}

`}>

{product.stock}

</span>


</td>







<td className="px-6 py-5">


<form

action={
toggleFeaturedProduct.bind(
null,
product.id
)
}

>


<button

className={`
flex
items-center
gap-2
rounded-full
px-3
py-2
text-xs
font-bold

${
product.isFeatured

?

"bg-orange-500 text-black"

:

"bg-white/10 text-white/50"

}

`}

>


<Star size={14}/>


{
product.isFeatured
?
"Featured"
:
"Make Featured"
}


</button>


</form>


</td>








<td className="px-6 py-5">


<span className={`
rounded-full
px-3
py-1
text-xs
font-bold

${
product.isActive

?

"bg-green-500/20 text-green-400"

:

"bg-red-500/20 text-red-400"

}

`}>

{
product.isActive
?
"Active"
:
"Inactive"
}


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

href={`/dashboard/products/${product.id}/edit`}

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

action={
deleteProduct.bind(
null,
product.id
)
}

>


<button

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