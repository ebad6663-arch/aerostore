"use client";





interface Props {

title:string;

message:string;

actionText?:string;

onAction?:()=>void;

}



export default function AeroAlert({

title,

message,

actionText,

onAction,

}:Props){



return (


<div className="
fixed
inset-0
z-[100]
flex
items-center
justify-center
bg-black/70
backdrop-blur-md
px-6
">


<div className="
w-full
max-w-md
rounded-3xl
border
border-white/10
bg-[#111]
p-8
text-center
shadow-2xl
">


<div className="
mx-auto
mb-6
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-orange-500/10
">


<span className="
text-3xl
font-black
text-orange-500
">

A

</span>


</div>





<h2 className="
text-2xl
font-black
text-white
">

{title}

</h2>




<p className="
mt-3
text-sm
leading-relaxed
text-white/60
">

{message}

</p>





{
actionText && (

<button

onClick={onAction}

className="
mt-7
w-full
rounded-full
bg-orange-500
py-3
font-bold
text-black
transition
hover:bg-orange-400
"

>

{actionText}

</button>

)

}



</div>


</div>


);


}