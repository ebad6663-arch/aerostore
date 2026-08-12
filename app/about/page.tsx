import Image from "next/image";

import { getActiveTeamMembers } from "@/lib/actions/team";



export default async function AboutPage() {


const members =
await getActiveTeamMembers();



const founders =
members.filter(
(member)=>member.isFounder
);



const team =
members.filter(
(member)=>!member.isFounder
);





return (


<main className="
min-h-screen
bg-background
text-foreground
">







{/* HERO */}



<section className="
shell
pt-36
pb-20
">



<p className="eyebrow">

AERO Studio

</p>





<h1 className="
mt-6
max-w-4xl
text-6xl
font-black
tracking-tight
md:text-7xl
">


Building collectibles
that fans remember.


</h1>







<p className="
mt-8
max-w-2xl
text-lg
leading-relaxed
text-muted-foreground
">


AERO creates premium anime,
cartoon and pop culture collectibles
designed for collectors worldwide.


</p>



</section>









{/* FOUNDERS */}



<section className="
shell
pb-24
">



<p className="eyebrow">

Leadership

</p>



<h2 className="
mt-3
text-4xl
font-black
">

Founding Team

</h2>






{

founders.length===0 ? (


<div className="
mt-10
rounded-3xl
border
border-border
bg-card
p-10
text-center
text-muted-foreground
">


Team members will appear here.


</div>


)

:

(


<div className="
mt-10
grid
gap-8
md:grid-cols-3
">


{

founders.map((person)=>(


<TeamCard

key={person.id}

person={person}

large

/>


))


}



</div>


)



}




</section>









{/* TEAM */}




<section className="
shell
pb-32
">



<p className="eyebrow">

Operations

</p>



<h2 className="
mt-3
text-4xl
font-black
">

Working Team

</h2>







{

team.length===0 ? (


<div className="
mt-10
rounded-3xl
border
border-border
bg-card
p-10
text-center
text-muted-foreground
">


Team members will appear here.


</div>


)

:

(


<div className="
mt-10
grid
gap-8
sm:grid-cols-2
lg:grid-cols-4
">


{

team.map((person)=>(


<TeamCard

key={person.id}

person={person}

/>


))


}



</div>


)



}





</section>





</main>


);



}









function TeamCard({

person,

large=false,


}:{

person:{
  name:string;
  role:string;
  department?:string;
  image?:string;
  description?:string;
};

large?:boolean;

}){



return (


<div className="
group
overflow-hidden
rounded-3xl
border
border-border
bg-card
transition
hover:border-orange-500/40
">





<div className={`relative ${
large
?
"h-96"
:
"h-72"
}`}>


<Image

src={
person.image ??
"/placeholder.png"
}

alt={person.name}

fill

className="
object-cover
transition
duration-700
group-hover:scale-105
"

/>



</div>







<div className="p-6">



<h3 className="
text-2xl
font-black
">

{person.name}

</h3>





<p className="
mt-2
font-semibold
text-orange-400
">

{person.role}

</p>






{

person.department && (


<p className="
mt-2
text-sm
text-muted-foreground
">

{person.department}

</p>


)


}





</div>





</div>


);



}