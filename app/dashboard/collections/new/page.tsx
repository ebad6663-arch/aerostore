import { createCollection } from "@/lib/actions/collection";


export default function NewCollectionPage(){

return (

<div className="
min-h-screen
bg-black
p-8
text-white
">


<h1 className="
mb-8
text-4xl
font-black
">
Create Collection
</h1>



<form

action={createCollection}

className="
max-w-xl
space-y-6
rounded-3xl
border
border-white/10
bg-[#111]
p-8
"

>



<input

name="name"

required

placeholder="Collection Name"

className="
h-12
w-full
rounded-xl
border
border-white/10
bg-black
px-4
"

/>



<input

name="slug"

required

placeholder="Slug (anime-collection)"

className="
h-12
w-full
rounded-xl
border
border-white/10
bg-black
px-4
"

/>



<textarea

name="description"

placeholder="Collection Description"

className="
h-32
w-full
rounded-xl
border
border-white/10
bg-black
p-4
"

/>



<input

name="image"

required

placeholder="Image URL"

className="
h-12
w-full
rounded-xl
border
border-white/10
bg-black
px-4
"

/>



<div className="
flex
items-center
gap-3
">

<input

type="checkbox"

name="featured"

/>


<label>
Show on homepage
</label>


</div>




<input

name="sortOrder"

type="number"

defaultValue="0"

placeholder="Sort Order"

className="
h-12
w-full
rounded-xl
border
border-white/10
bg-black
px-4
"

/>




<button

type="submit"

className="
rounded-xl
bg-orange-500
px-8
py-3
font-bold
text-black
"

>

Create Collection

</button>



</form>


</div>

);

}