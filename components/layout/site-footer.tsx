"use client";

import Link from "next/link";

const shopLinks = [
  {
    href: "/products",
    label: "Shop All",
  },
  {
    href: "/collections",
    label: "Collections",
  },
  {
    href: "/about",
    label: "Our Story",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const supportLinks = [
  {
    href: "/shipping",
    label: "Shipping",
  },
  {
    href: "/returns",
    label: "Returns",
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/terms",
    label: "Terms & Conditions",
  },
];


const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/aerostore.official?igsh=aml0anQyMXE1MWQx&utm_source=qr",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/search?q=_aerostoreofficial&t=1786555410678",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1JAQCAq9kp/?mibextid=wwXIfr",
  },
];


export function SiteFooter() {

return (

<footer className="
border-t
border-border
bg-background
">


<div className="
shell
grid
gap-12
py-20
md:grid-cols-4
">


{/* BRAND */}

<div>

<Link

href="/"

className="
font-display
text-5xl
font-black
tracking-tight
"

>

AERO

</Link>


<p className="
mt-6
max-w-sm
leading-7
text-muted-foreground
">

Premium anime and pop culture collectibles designed for true fans.

</p>



<div className="
mt-8
inline-flex
rounded-full
border
border-orange-500/20
bg-orange-500/10
px-5
py-2
text-sm
font-semibold
text-orange-400
">

Premium Collectibles

</div>


</div>





{/* SHOP */}

<div>

<h3 className="
text-lg
font-black
">

Explore

</h3>


<div className="
mt-6
space-y-4
">

{
shopLinks.map((link)=>(

<Link

key={link.href}

href={link.href}

className="
block
text-sm
text-muted-foreground
transition
hover:text-orange-400
"

>

{link.label}

</Link>

))
}

</div>

</div>





{/* SUPPORT */}

<div>

<h3 className="
text-lg
font-black
">

Support

</h3>


<div className="
mt-6
space-y-4
">

{
supportLinks.map((link)=>(

<Link

key={link.href}

href={link.href}

className="
block
text-sm
text-muted-foreground
transition
hover:text-orange-400
"

>

{link.label}

</Link>

))
}

</div>

</div>





{/* SOCIAL */}

<div>

<h3 className="
text-lg
font-black
">

Follow Us

</h3>


<div className="
mt-6
space-y-4
">

{
socialLinks.map((link)=>(

<a

key={link.label}

href={link.href}

target="_blank"

rel="noopener noreferrer"

className="
block
text-sm
text-muted-foreground
transition
hover:text-orange-400
"

>

{link.label}

</a>

))
}

</div>

</div>



</div>





<div className="
shell
flex
flex-col
gap-3
border-t
border-border
py-6
text-sm
text-muted-foreground
md:flex-row
md:items-center
md:justify-between
">

<p>

© {new Date().getFullYear()} AEROSTORE. All rights reserved.

</p>


<p>

Built for anime & collectible lovers.

</p>


</div>


</footer>

);

}