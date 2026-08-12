import {
  getCollections,
  deleteCollection,
} from "@/lib/actions/collection";


export default async function CollectionsPage(){


const collections =
await getCollections();



return (

<div className="
min-h-screen
bg-black
p-8
text-white
">


<div className="
flex
items-center
justify-between
mb-8
">


<h1 className="
text-4xl
font-black
">
Collections
</h1>



<a

href="/dashboard/collections/new"

className="
rounded-xl
bg-orange-500
px-6
py-3
font-bold
text-black
"

>
Add Collection
</a>


</div>





<div className="
space-y-4
">


{
collections.map((collection)=>(


<div

key={collection.id}

className="
flex
items-center
justify-between
rounded-2xl
border
border-white/10
bg-[#111]
p-5
"

>


<div>


<h2 className="
text-xl
font-bold
">

{collection.name}

</h2>



<p className="
text-neutral-400
">

{collection.description}

</p>



<p className="
mt-2
text-orange-400
">

{
collection.featured
?
"Homepage Visible"
:
"Hidden"
}

</p>


</div>





<form

action={
deleteCollection.bind(
null,
collection.id
)
}

>


<button

className="
text-red-400
hover:text-red-300
"

>
Delete
</button>


</form>



</div>


))

}



</div>



</div>

);

}