
import Link from "next/link";

import { getStoreSettings } from "@/lib/actions/settings";
import { getFeaturedProducts } from "@/lib/actions/products";



export default async function HomePage() {


const settings = await getStoreSettings();


const featuredProducts =
await getFeaturedProducts();




const collections = [
  {
    id: "anime",
    name: "Anime",
    slug: "anime",
    description:
      "Premium anime-inspired keychains and collectibles for true fans.",
  },
  {
    id: "cartoon",
    name: "Cartoon",
    slug: "cartoon",
    description:
      "Iconic cartoon characters redesigned into premium collectibles.",
  },
];





return (


<main className="min-h-screen bg-background text-foreground">





{/* HERO */}


<section className="
relative
flex
min-h-[90vh]
items-center
overflow-hidden
pt-32
">


{
settings?.heroImage && (

<img

src={settings.heroImage}

alt="AERO premium anime and cartoon keychains collection"

className="
absolute
inset-0
h-full
w-full
object-cover
opacity-30
"

/>

)

}



<div className="
absolute
inset-0
bg-gradient-to-r
from-black
via-black/80
to-transparent
"/>




<div className="shell relative z-10">


<p className="eyebrow">
Premium Collectibles
</p>




<h1 className="
mt-6
max-w-4xl
text-6xl
font-black
leading-[0.95]
tracking-tight
md:text-8xl
">


{
settings?.heroTitle ??
"AERO Premium Anime & Custom Keychains in Pakistan"
}


</h1>




<p className="
mt-8
max-w-xl
text-lg
text-white/60
">


{
settings?.heroDescription ??
"Shop premium anime keychains, cartoon collectibles and custom designs made for fans across Pakistan."
}


</p>





<div className="
mt-10
flex
flex-wrap
gap-4
">


<Link

href="/products"

className="
rounded-full
bg-orange-500
px-10
py-4
font-bold
text-black
transition
hover:scale-105
"

>

Explore Collection

</Link>



<Link

href="/about"

className="
rounded-full
border
border-white/20
px-10
py-4
font-semibold
text-white
transition
hover:bg-white/10
"

>

Our Story

</Link>


</div>


</div>


</section>







{/* STATS */}


<section className="shell py-16">


<div className="
grid
gap-6
sm:grid-cols-3
">


{
[
["500+","Happy Collectors"],
["100+","Unique Designs"],
["Premium","Quality Guaranteed"],
].map((item)=>(


<div

key={item[1]}

className="
rounded-3xl
border
border-border
bg-card
p-8
"

>

<h3 className="
text-4xl
font-black
text-accent
">

{item[0]}

</h3>


<p className="
mt-3
text-muted-foreground
">

{item[1]}

</p>


</div>


))

}


</div>


</section>







{/* COLLECTIONS */}


<section className="
mt-32
mx-auto
max-w-6xl
px-6
">


<div className="mb-12">


<p className="
text-sm
font-semibold
uppercase
tracking-[0.3em]
text-orange-500
">

Explore

</p>



<h2 className="
mt-4
text-5xl
font-black
tracking-tight
">

Collections

</h2>


</div>





<div className="
grid
gap-8
md:grid-cols-2
">



{
collections.map((collection)=>(


<Link


key={collection.id}


href={`/products?category=${collection.slug}`}


className="
group
rounded-3xl
border
border-white/10
bg-[#111]
p-10
transition
hover:-translate-y-2
hover:border-orange-500/30
"

>


<div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-orange-500/10
text-2xl
text-orange-500
">

✦

</div>



<h3 className="
mt-8
text-3xl
font-black
text-white
">

{collection.name}

</h3>



<p className="
mt-4
text-base
leading-relaxed
text-neutral-400
">

{collection.description}

</p>



<p className="
mt-8
text-sm
font-black
tracking-[0.25em]
text-orange-500
">

EXPLORE COLLECTION →

</p>



</Link>


))

}



</div>


</section>







{/* FEATURED PRODUCTS */}



<section className="
shell
mt-32
pb-24
">


<div className="
flex
items-end
justify-between
">


<div>


<p className="eyebrow">
Featured
</p>


<h2 className="
mt-4
text-5xl
font-black
">

Trending Now

</h2>


</div>



<Link

href="/products"

className="
text-orange-400
hover:text-orange-300
"

>

View All

</Link>


</div>





<div className="
mt-10
grid
gap-8
sm:grid-cols-2
lg:grid-cols-4
">


{
featuredProducts.map((product)=>(


<Link

key={product.id}

href={`/products/${product.slug}`}

className="
group
overflow-hidden
rounded-3xl
border
border-border
bg-card
transition
hover:-translate-y-2
"

>


<div className="
h-72
overflow-hidden
bg-black
">


<img

src={
product.images[0]?.url ??
"/placeholder.png"
}

alt={`${product.name} premium collectible keychain from AERO Store`}

className="
h-full
w-full
object-contain
transition
duration-700
group-hover:scale-110
"

/>


</div>




<div className="p-5">


<h3 className="
font-bold
">

{product.name}

</h3>



<p className="
mt-3
font-black
text-accent
">

PKR {Number(product.price).toLocaleString()}

</p>


</div>



</Link>


))

}


</div>



</section>




</main>


);

}