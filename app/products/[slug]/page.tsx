import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { ArrowLeft, PackageCheck } from "lucide-react";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/shop/ProductGallery";
import { getProductBySlug } from "@/lib/actions/products";
import AddToCartButton from "@/components/shop/AddToCartButton";


interface Props {
  params: Promise<{
    slug: string;
  }>;
}



export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {


  const { slug } = await params;


  const product =
    await getProductBySlug(slug);



  if (!product) {

    return {
      title: "Product Not Found | AERO Store",
    };

  }



  return {

    title:
      product.metaTitle ??
      `${product.name} | AERO Store`,


    description:
      product.metaDescription ??
      product.description ??
      `Buy ${product.name} premium collectible from AERO Store.`,


    openGraph: {

      title:
        product.metaTitle ??
        `${product.name} | AERO Store`,


      description:
        product.metaDescription ??
        product.description ??
        `Premium collectible ${product.name} from AERO Store.`,


      images: [
        product.images?.[0]?.url ??
        "/placeholder.png"
      ],


      type: "website",

    },

  };

}





export default async function ProductPage({
  params,
}: Props) {


  const { slug } = await params;



  const product =
    await getProductBySlug(slug);



  if (!product) {

    notFound();

  }



  const formattedProduct = {

    ...product,

    price: Number(product.price),

  };





  const productSchema = {

    "@context": "https://schema.org",

    "@type": "Product",

    name: product.name,


    description:
      product.description ??
      `Premium ${product.name} collectible from AERO Store.`,


    image:
      product.images?.map(
        (image) => image.url
      ) ?? [],



    brand: {

      "@type": "Brand",

      name: "AERO Store",

    },


    category:
      product.category?.name ??
      "Collectible",



    offers: {

      "@type": "Offer",


      url:
        `https://aerostore.pro/products/${product.slug}`,


      priceCurrency: "PKR",


      price:
        Number(product.price),



      availability:
        product.stock > 0

          ? "https://schema.org/InStock"

          : "https://schema.org/OutOfStock",



      seller: {

        "@type": "Organization",

        name: "AERO Store",

      },


    },


  };






  return (

    <>


      <Script
        id="product-schema"
        type="application/ld+json"
      >

        {JSON.stringify(productSchema)}

      </Script>





      <main
        className="
        min-h-screen
        bg-background
        text-foreground
        pt-32
        "
      >



        <section className="shell py-12">



          <Link
            href="/products"
            className="
            mb-10
            inline-flex
            items-center
            gap-2
            text-sm
            text-muted-foreground
            transition
            hover:text-white
            "
          >

            <ArrowLeft size={16}/>

            Back to Shop

          </Link>






          <div
            className="
            grid
            gap-12
            lg:grid-cols-2
            "
          >





            <div
              className="
              rounded-3xl
              border
              border-border
              bg-card
              p-6
              "
            >

              <ProductGallery
                images={product.images}
                name={product.name}
              />


            </div>








            <div
              className="
              flex
              flex-col
              justify-center
              "
            >



              <p className="eyebrow">

                {
                  product.category?.name ??
                  "Collectible"
                }

              </p>





              <h1
                className="
                mt-5
                text-5xl
                font-black
                leading-tight
                tracking-tight
                md:text-6xl
                "
              >

                {product.name}

              </h1>






              <p
                className="
                mt-6
                text-lg
                leading-relaxed
                text-muted-foreground
                "
              >

                {product.description}

              </p>







              <div
                className="
                mt-8
                text-4xl
                font-black
                text-accent
                "
              >

                PKR {Number(product.price).toLocaleString()}

              </div>








              <div
                className="
                mt-6
                flex
                items-center
                gap-3
                "
              >

                <PackageCheck
                  size={20}
                  className="text-accent"
                />


                <p
                  className="
                  text-sm
                  text-muted-foreground
                  "
                >

                  {
                    product.stock > 0
                    ? `${product.stock} pieces available`
                    : "Currently unavailable"
                  }

                </p>


              </div>








              <div className="mt-10">

                <AddToCartButton
                  product={formattedProduct}
                />

              </div>







              <div
                className="
                mt-10
                grid
                grid-cols-2
                gap-4
                "
              >


                <div
                  className="
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  p-5
                  "
                >

                  <p
                    className="
                    text-xs
                    uppercase
                    tracking-widest
                    text-muted-foreground
                    "
                  >

                    Quality

                  </p>


                  <p className="mt-2 font-bold">

                    Premium Finish

                  </p>


                </div>







                <div
                  className="
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  p-5
                  "
                >

                  <p
                    className="
                    text-xs
                    uppercase
                    tracking-widest
                    text-muted-foreground
                    "
                  >

                    Category

                  </p>


                  <p className="mt-2 font-bold">

                    {
                      product.category?.name ??
                      "Anime"
                    }

                  </p>


                </div>


              </div>





            </div>





          </div>





        </section>




      </main>



    </>

  );

}