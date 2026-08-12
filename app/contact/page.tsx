import {
  Mail,
  Phone,
} from "lucide-react";


const contactItems = [

{
icon: Mail,
title:"Email",
value:"teamaerostore@gmail.com",
href:"mailto:teamaerostore@gmail.com",
type:"icon",
},


{
icon: Phone,
title:"Phone",
value:"0399 8966772",
href:"tel:+923998966772",
type:"icon",
},


{
title:"Instagram",
value:"aerostore.official",
href:"https://www.instagram.com/aerostore.official?igsh=aml0anQyMXE1MWQx&utm_source=qr",
type:"social",
symbol:"◎",
},


{
title:"TikTok",
value:"_aerostoreofficial",
href:"https://www.tiktok.com/search?q=_aerostoreofficial&t=1786555410678",
type:"social",
symbol:"♪",
},


{
title:"Facebook",
value:"Aero Store",
href:"https://www.facebook.com/share/1JAQCAq9kp/?mibextid=wwXIfr",
type:"social",
symbol:"f",
},


];




export default function ContactPage(){


return (


<main className="
min-h-screen
bg-background
text-foreground
pt-32
">


<section className="
shell
py-16
">


<p className="eyebrow">

Contact AERO

</p>





<h1 className="
mt-6
max-w-4xl
text-6xl
font-black
tracking-tight
">

Let&apos;s create something
worth collecting.

</h1>






<p className="
mt-6
max-w-2xl
text-lg
leading-relaxed
text-muted-foreground
">

Have questions about products, orders,
or collaborations? Our team is ready
to help.

</p>







<div className="
mt-16
grid
gap-6
md:grid-cols-3
">


{

contactItems.map((item)=>(


<a


key={item.title}


href={item.href}


target="_blank"


rel="noopener noreferrer"


className="
rounded-3xl
border
border-border
bg-card
p-8
transition
hover:border-orange-500/40
"



>


{


item.type === "icon" ? (


item.icon &&

<item.icon

size={28}

className="text-orange-400"

/>


)


:

(


<div className="
text-orange-400
text-3xl
font-black
">

{item.symbol}

</div>


)



}







<h2 className="
mt-6
text-xl
font-black
">

{item.title}

</h2>






<p className="
mt-3
text-muted-foreground
transition
hover:text-orange-400
">

{item.value}

</p>





</a>



))


}



</div>









<div className="
mt-16
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

Customer Support

</p>






<h2 className="
mt-4
text-3xl
font-black
">

Need help with your order?

</h2>






<p className="
mt-3
max-w-xl
leading-relaxed
text-muted-foreground
">

Our team handles product questions,
order assistance and collaboration
requests.

</p>





</div>







</section>


</main>


);


}