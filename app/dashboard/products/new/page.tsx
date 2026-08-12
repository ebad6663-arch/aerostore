import { prisma } from "@/lib/prisma";

import { createProduct } from "@/lib/actions/products";

import ProductImageField from "@/components/admin/ProductImageField";



export default async function NewProductPage(){



const categories = await prisma.category.findMany({

where:{
  slug:{
    in:[
      "anime",
      "cartoon",
    ],
  },
},


orderBy:{
name:"asc",
},


});





return (


<div className="space-y-8">





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

Add Product

</h1>



<p className="
mt-2
text-white/50
">

Create a new Anime or Cartoon collectible.

</p>


</div>







<form

action={createProduct}

className="
space-y-8
rounded-3xl
border
border-white/10
bg-[#111]
p-8
"

>






<div className="
grid
gap-8
md:grid-cols-2
">







<div className="md:col-span-2">


<label className="mb-2 block text-sm font-semibold text-white/70">

Product Name

</label>



<input

name="name"

required

placeholder="Naruto Keychain"

className="
w-full
rounded-xl
border
border-white/10
bg-[#181818]
px-4
py-3
text-white
outline-none
focus:border-orange-500
"

/>


</div>








<div className="md:col-span-2">


<label className="mb-2 block text-sm font-semibold text-white/70">

Description

</label>



<textarea

name="description"

required

rows={6}

placeholder="Premium anime collectible..."

className="
w-full
rounded-xl
border
border-white/10
bg-[#181818]
px-4
py-3
text-white
outline-none
focus:border-orange-500
"

/>


</div>









<div>


<label className="mb-2 block text-sm font-semibold text-white/70">

Selling Price

</label>



<input

type="number"

name="price"

required

min="0"

className="
w-full
rounded-xl
border
border-white/10
bg-[#181818]
px-4
py-3
text-white
outline-none
focus:border-orange-500
"

/>


</div>







<div>


<label className="mb-2 block text-sm font-semibold text-white/70">

Stock

</label>



<input

type="number"

name="stock"

required

min="0"

className="
w-full
rounded-xl
border
border-white/10
bg-[#181818]
px-4
py-3
text-white
outline-none
focus:border-orange-500
"

/>


</div>








<div className="md:col-span-2">


<label className="mb-2 block text-sm font-semibold text-white/70">

Collection

</label>



<select

name="categoryId"

required

className="
w-full
rounded-xl
border
border-white/10
bg-[#181818]
px-4
py-3
text-white
outline-none
focus:border-orange-500
"

>


<option value="">

Select Collection

</option>



{

categories.map((category)=>(


<option

key={category.id}

value={category.id}

>

{category.name}

</option>


))


}



</select>


</div>





</div>









{/* IMAGES */}



<div className="
rounded-2xl
border
border-white/10
bg-white/[0.03]
p-6
">


<h2 className="
mb-5
text-xl
font-black
text-white
">

Product Images

</h2>



<ProductImageField />


</div>









<div className="
flex
justify-end
gap-4
">


<button

type="reset"

className="
rounded-xl
border
border-white/10
px-6
py-3
font-semibold
text-white
hover:bg-white/5
"

>

Reset

</button>





<button

type="submit"

className="
rounded-xl
bg-orange-500
px-8
py-3
font-bold
text-black
hover:bg-orange-400
"

>

Create Product

</button>



</div>





</form>






</div>


);

}