"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


async function getCurrentUser() {

  const session = await auth();


  if (!session?.user?.email) {
    throw new Error("Please login first.");
  }


  const user = await prisma.user.findUnique({

    where: {
      email: session.user.email,
    },

  });


  if (!user) {
    throw new Error("User not found.");
  }


  return user;

}



export async function getProductReviews(
  productId: string
) {

  return prisma.review.findMany({

    where: {
      productId,
    },


    include: {

      user: {

        select: {

          id: true,
          name: true,
          image: true,

        },

      },

    },


    orderBy: {

      createdAt: "desc",

    },

  });

}




export async function getAverageRating(
  productId: string
) {


  const result = await prisma.review.aggregate({

    where: {
      productId,
    },


    _avg: {

      rating: true,

    },


    _count: {

      rating: true,

    },

  });



  return {

    rating: result._avg.rating ?? 0,

    total: result._count.rating,

  };

}





export async function createReview(
  productId: string,
  rating: number,
  comment: string
) {


  const user = await getCurrentUser();



  if (rating < 1 || rating > 5) {

    throw new Error(
      "Rating must be between 1 and 5."
    );

  }




  const exists = await prisma.review.findUnique({

    where: {

      userId_productId: {

        userId: user.id,

        productId,

      },

    },

  });



  if (exists) {

    throw new Error(
      "You have already reviewed this product."
    );

  }




  await prisma.review.create({

    data: {

      userId: user.id,

      productId,

      rating,

      comment,

    },

  });



  revalidatePath(`/products/${productId}`);

}





export async function updateReview(
  reviewId: string,
  rating: number,
  comment: string
) {


  const user = await getCurrentUser();



  const review = await prisma.review.findUnique({

    where: {

      id: reviewId,

    },

  });



  if (!review || review.userId !== user.id) {

    throw new Error("Unauthorized");

  }



  await prisma.review.update({

    where: {

      id: reviewId,

    },


    data: {

      rating,

      comment,

    },

  });



  revalidatePath("/products");

}





export async function deleteReview(
  reviewId: string
) {


  const user = await getCurrentUser();



  const review = await prisma.review.findUnique({

    where: {

      id: reviewId,

    },

  });



  if (!review || review.userId !== user.id) {

    throw new Error("Unauthorized");

  }




  await prisma.review.delete({

    where: {

      id: reviewId,

    },

  });



  revalidatePath("/products");

}