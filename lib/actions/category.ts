"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


function slugify(text: string) {

  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

}



export async function getCategories() {

  return await prisma.category.findMany({

    include: {

      _count: {

        select: {

          products: true,

        },

      },

    },

    orderBy: {

      name: "asc",

    },

  });

}




export async function createCategory(
  formData: FormData
) {

  console.log("CREATE CATEGORY STARTED");


  const name =
    String(formData.get("name") || "");


  const description =
    String(formData.get("description") || "");


  console.log({
    name,
    description,
  });



  if(!name){

    throw new Error(
      "Category name missing"
    );

  }



  const slug =
    slugify(name);



  console.log("SLUG:", slug);



  const category =
    await prisma.category.create({

      data:{

        name,

        slug,

        description:
          description || null,

      },

    });



  console.log(
    "CREATED:",
    category
  );



  revalidatePath("/dashboard/categories");


  return category;

}






export async function deleteCategory(
  id: string
) {


  const products =
    await prisma.product.count({

      where: {

        categoryId: id,

      },

    });



  if (products > 0) {

    throw new Error(
      "Cannot delete category with products"
    );

  }



  await prisma.category.delete({

    where: {

      id,

    },

  });



  revalidatePath("/dashboard/settings");
  revalidatePath("/");

}