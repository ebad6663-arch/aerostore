"use client";

import Image from "next/image";
import { useState } from "react";


interface Props {
  images: {
    id: string;
    url: string;
  }[];

  name: string;
}



export default function ProductGallery({
  images,
  name,
}: Props) {


const [activeImage, setActiveImage] = useState(
  images[0]?.url ?? "/placeholder.png"
);



return (

<div className="space-y-5">


<div
className="
relative
aspect-square
overflow-hidden
rounded-2xl
bg-black
"
>

<Image

src={activeImage}

alt={`${name} premium collectible keychain from AERO Store`}

fill

className="
object-contain
"

/>

</div>




<div className="
grid
grid-cols-4
gap-3
">


{
images.map((image)=>(

<button

key={image.id}

type="button"

onClick={() => setActiveImage(image.url)}

className={`
relative
aspect-square
overflow-hidden
rounded-xl
border
transition
${
activeImage === image.url
?
"border-orange-500"
:
"border-white/10"
}
`}

>


<Image

src={image.url}

alt={name}

fill

className="
object-contain
"

/>


</button>


))

}



</div>



</div>


);

}