import Link from "next/link";
import type { Metadata } from "next";



export const metadata: Metadata = {

title:
"Anime & Cartoon Keychain Collections Pakistan | AERO Store",


description:
"Explore AERO Store collections featuring premium anime keychains, cartoon collectibles and unique designs for collectors in Pakistan.",


keywords:[

"anime keychains Pakistan",

"cartoon keychains Pakistan",

"anime collectibles",

"cartoon collectibles",

"anime gifts Pakistan",

"AERO Store collections",

],


openGraph:{


title:
"Anime & Cartoon Collections | AERO Store",


description:
"Discover premium anime and cartoon collectibles crafted for fans.",


type:"website",


},


};







const collections = [


{
name:"Anime",

slug:"anime",

description:
"Premium anime-inspired keychains and collectibles for true fans.",
},



{
name:"Cartoon",

slug:"cartoon",

description:
"Iconic cartoon characters redesigned into premium collectibles.",
},


];







export default function CollectionsPage(){



return (



<main className="
min-h-screen
bg-background
text-foreground
pt-32
">



<section className="shell py-16">






<p className="eyebrow">

Collections

</p>







<h1 className="
mt-5
text-6xl
font-black
tracking-tight
">


Anime & Cartoon Collections


</h1>







<p className="
mt-6
max-w-xl
text-lg
text-muted-foreground
">


Explore AERO&apos;s premium anime keychains, cartoon collectibles and
exclusive designs created for collectors.


</p>










<div className="
mt-14
grid
gap-8
md:grid-cols-2
">






{


collections.map((collection)=>(




<Link


key={collection.slug}


href={`/products?collection=${collection.slug}`}


className="
group
rounded-3xl
border
border-border
bg-card
p-10
transition
duration-300
hover:-translate-y-1
hover:border-orange-500/40
"



>




<div className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-orange-500/10
text-2xl
text-orange-400
">


✦


</div>








<h2 className="
mt-8
text-4xl
font-black
">


{collection.name}


</h2>








<p className="
mt-4
leading-7
text-muted-foreground
">


{collection.description}


</p>








<p className="
mt-8
text-sm
font-bold
uppercase
tracking-[0.2em]
text-orange-400
">


Explore Collection →


</p>







</Link>




))




}




</div>









<div className="
mt-20
rounded-3xl
border
border-orange-500/20
bg-orange-500/10
p-10
">



<p className="
text-sm
font-bold
uppercase
tracking-[0.25em]
text-orange-400
">


AERO Collectibles


</p>




<h2 className="
mt-4
text-3xl
font-black
">


Made for fans. Designed for collectors.


</h2>




<p className="
mt-3
max-w-xl
text-muted-foreground
">


From anime legends to nostalgic cartoon characters,
AERO brings premium collectible keychains closer to fans.


</p>




</div>







</section>





</main>



);



}