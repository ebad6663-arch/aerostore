import Link from "next/link";
import type { Metadata } from "next";

import { getProducts } from "@/lib/actions/products";
import { ProductCard } from "@/components/shop/product-card";


interface Props {

  searchParams: Promise<{
    collection?: string;
  }>;

}



export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {


  const params = await searchParams;


  const collection = params.collection;



  if (collection) {

    return {

      title:
        `${collection.charAt(0).toUpperCase() + collection.slice(1)} Keychains Pakistan | AERO Store`,

      description:
        `Shop premium ${collection} keychains and collectibles from AERO Store. High-quality designs made for collectors in Pakistan.`,

    };

  }



  return {

    title:
      "Anime & Cartoon Keychains Pakistan | AERO Store",


    description:
      "Browse premium anime keychains, cartoon collectibles and exclusive designs from AERO Store Pakistan.",


    keywords: [

      "anime keychains Pakistan",
      "cartoon keychains Pakistan",
      "collectible keychains",
      "anime gifts Pakistan",
      "custom keychains",

    ],

  };

}




export default async function ProductsPage({
  searchParams,
}: Props) {



  const params = await searchParams;



  const products =
    await getProducts(
      params.collection
        ? {
            category: params.collection,
          }
        : undefined
    );



  const formattedProducts = products.map((product)=>({

    ...product,

    price: Number(product.price),

  }));





  const pageTitle =

    params.collection

      ? `${params.collection.charAt(0).toUpperCase()}${params.collection.slice(1)} Collection`

      : "Anime & Cartoon Keychains";





  return (

    <main
      className="
      min-h-screen
      bg-background
      text-foreground
      pt-32
      "
    >


      <section className="shell py-16">


        <p className="eyebrow">

          AERO Collection

        </p>




        <h1
          className="
          mt-5
          text-6xl
          font-black
          tracking-tight
          "
        >

          {pageTitle}

        </h1>





        <p
          className="
          mt-6
          max-w-2xl
          text-lg
          text-muted-foreground
          "
        >

          Explore AERO&apos;s premium anime keychains, cartoon collectibles,
          exclusive designs and limited drops created for collectors.

        </p>






        <div
          className="
          mt-10
          flex
          flex-wrap
          gap-3
          "
        >


          <Link
            href="/products"
            className="
            rounded-full
            border
            border-border
            px-6
            py-3
            text-sm
            transition
            hover:border-orange-500
            hover:text-orange-400
            "
          >

            All Products

          </Link>





          <Link
            href="/products?collection=anime"
            className="
            rounded-full
            border
            border-border
            px-6
            py-3
            text-sm
            transition
            hover:border-orange-500
            hover:text-orange-400
            "
          >

            Anime Keychains

          </Link>





          <Link
            href="/products?collection=cartoon"
            className="
            rounded-full
            border
            border-border
            px-6
            py-3
            text-sm
            transition
            hover:border-orange-500
            hover:text-orange-400
            "
          >

            Cartoon Keychains

          </Link>


        </div>







        <div
          className="
          mt-12
          flex
          items-center
          justify-between
          border-y
          border-border
          py-5
          "
        >

          <p
            className="
            text-sm
            text-muted-foreground
            "
          >

            Showing {formattedProducts.length} products

          </p>


        </div>








        {
          formattedProducts.length === 0 ? (


            <div
              className="
              mt-20
              rounded-3xl
              border
              border-border
              bg-card
              p-12
              text-center
              "
            >

              <h2
                className="
                text-3xl
                font-black
                "
              >

                No Products Found

              </h2>




              <p className="mt-3 text-muted-foreground">

                Products added from dashboard will appear here.

              </p>





              <Link
                href="/dashboard/products/new"
                className="
                mt-8
                inline-flex
                rounded-full
                bg-orange-500
                px-8
                py-3
                font-bold
                text-black
                "
              >

                Add Product

              </Link>


            </div>


          ) : (



            <div
              className="
              mt-12
              grid
              gap-8
              sm:grid-cols-2
              lg:grid-cols-4
              "
            >


              {
                formattedProducts.map((product)=>(

                  <ProductCard

                    key={product.id}

                    product={product}

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