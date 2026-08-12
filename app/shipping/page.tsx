export default function ShippingPage(){

return (

<main className="
min-h-screen
bg-background
text-foreground
pt-36
">

<section className="shell py-16">


<p className="eyebrow">
Support
</p>


<h1 className="
mt-5
text-6xl
font-black
">
Shipping Information
</h1>


<p className="
mt-6
max-w-2xl
text-lg
text-muted-foreground
">
Everything you need to know about delivery.
</p>



<div className="
mt-12
rounded-3xl
border
border-border
bg-card
p-8
max-w-3xl
space-y-6
">


<div>
<h2 className="text-2xl font-black">
Karachi Delivery
</h2>

<p className="mt-2 text-muted-foreground">
Orders usually arrive within 1-2 business days.
</p>
</div>



<div>
<h2 className="text-2xl font-black">
Other Cities
</h2>

<p className="mt-2 text-muted-foreground">
Orders outside Karachi usually arrive within 3-5 business days.
</p>
</div>



<div>
<h2 className="text-2xl font-black">
Order Processing
</h2>

<p className="mt-2 text-muted-foreground">
Orders are verified before dispatch.
Our team may contact you for confirmation.
</p>
</div>



</div>


</section>

</main>

);

}