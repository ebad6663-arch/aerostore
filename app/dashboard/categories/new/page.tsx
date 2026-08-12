import { createCategory } from "@/lib/actions/categories";



export default async function NewCategoryPage(){



return (


<div className="
min-h-screen
bg-black
p-8
text-white
">



<h1 className="
text-4xl
font-black
mb-8
">
Create Category
</h1>




<form


action={createCategory}


className="
space-y-6
max-w-xl
rounded-3xl
border
border-white/10
bg-[#111]
p-8
"


>



<div>


<label className="
text-sm
text-neutral-400
">
Category Name
</label>



<input


name="name"


required


placeholder="Anime"


className="
mt-2
h-12
w-full
rounded-xl
border
border-white/10
bg-black
px-4
text-white
"


/>


</div>





<div>


<label className="
text-sm
text-neutral-400
">
Description
</label>



<input


name="description"


placeholder="Premium anime collectibles"


className="
mt-2
h-12
w-full
rounded-xl
border
border-white/10
bg-black
px-4
text-white
"


/>


</div>





<button


type="submit"


className="
rounded-xl
bg-orange-500
px-6
py-3
font-bold
text-black
"


>
Create Category
</button>




</form>



</div>


);


}