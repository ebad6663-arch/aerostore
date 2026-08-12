import "./globals.css";
import { SiteHeader }  from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import type { Metadata } from "next";

import {
  Geist,
  Space_Grotesk,
} from "next/font/google";


import AuthProvider from "@/components/providers/SessionProvider";
import QueryProvider from "@/components/providers/QueryProvider";

import {
  CartProvider,
} from "@/context/CartContext";

import {
  Toaster,
} from "@/components/ui/sonner";



const geist = Geist({

  subsets:["latin"],

  variable:"--font-geist",

  display:"swap",

});



const spaceGrotesk = Space_Grotesk({

  subsets:["latin"],

  variable:"--font-heading",

  display:"swap",

});




export const metadata: Metadata = {

title: {
default: "AeroStore | Premium Anime & Custom Keychains Pakistan",
template: "%s | AeroStore",
},

icons: {
  icon: "/favicon.png",
  shortcut: "/favicon.png",
  apple: "/favicon.png",
},

description:
"Buy premium anime keychains, cartoon collectibles and custom designs in Pakistan. AeroStore creates high-quality collectibles for anime and pop culture fans.",


keywords:[
"anime keychains Pakistan",
"custom keychains Pakistan",
"anime collectibles Pakistan",
"cartoon keychains Pakistan",
"anime gifts Pakistan",
"premium keychains",
"AeroStore",
],


metadataBase:
new URL("https://yourdomain.com"),


openGraph:{

title:
"AeroStore | Premium Anime & Custom Keychains Pakistan",

description:
"Premium anime, cartoon and custom collectibles crafted for true fans.",

url:
"https://yourdomain.com",

siteName:
"AeroStore",

type:
"website",

},


twitter:{
card:"summary_large_image",

title:
"AeroStore | Premium Anime & Custom Keychains Pakistan",

description:
"Premium anime and cartoon collectibles crafted for fans.",

},


robots:{
index:true,
follow:true,
},


};



export default function RootLayout({

  children,

}:{

  children:React.ReactNode;

}) {



return (

<html

lang="en"

suppressHydrationWarning

className={`
${geist.variable}
${spaceGrotesk.variable}
`}

>


<body

className="
antialiased
"

suppressHydrationWarning

>


<AuthProvider>


<QueryProvider>


<CartProvider>

<SiteHeader />


{/* Background Atmosphere */}


<div

className="
fixed
inset-0
-z-50
overflow-hidden
pointer-events-none
"

>


<div

className="
absolute
left-1/2
top-0
h-[900px]
w-[900px]
-translate-x-1/2
rounded-full
bg-orange-500/[0.04]
blur-[260px]
"

/>



<div

className="
absolute
left-0
bottom-0
h-[450px]
w-[450px]
rounded-full
bg-white/[0.02]
blur-[180px]
"

/>



<div

className="
absolute
right-0
top-1/3
h-[450px]
w-[450px]
rounded-full
bg-orange-500/[0.03]
blur-[180px]
"

/>



</div>








{children}



<SiteFooter />



</CartProvider>


</QueryProvider>


</AuthProvider>




<Toaster

richColors

position="top-right"

/>



</body>


</html>


);

}