import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


  const baseUrl =
    "https://yourdomain.com";



  const products =
    await prisma.product.findMany({

      where: {

        isActive: true,

        deletedAt: null,

      },

      select: {

        slug: true,

        updatedAt: true,

      },

    });





  const categories =
    await prisma.category.findMany({

      select: {

        slug: true,

      },

    });






  return [


    {
      url: baseUrl,
      lastModified: new Date(),
    },


    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },



    ...categories.map((category)=>({

      url:
        `${baseUrl}/collections/${category.slug}`,

      lastModified:
        new Date(),

    })),



    ...products.map((product)=>({

      url:
        `${baseUrl}/products/${product.slug}`,

      lastModified:
        product.updatedAt,

    })),



  ];

}