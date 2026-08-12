"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";


interface CreateOrderData {

  fullName: string;

  phone: string;

  addressLine: string;

  city: string;

  province: string;

  paymentMethod: PaymentMethod;

}



async function getCurrentUser() {


  const session = await auth();


  if (!session?.user?.email) {

    throw new Error(
      "You must be logged in."
    );

  }



  const user =
    await prisma.user.findUnique({

      where: {

        email: session.user.email,

      },

    });



  if (!user) {

    throw new Error(
      "User not found."
    );

  }



  return user;

}




export async function getOrders(){


  const user =
    await getCurrentUser();



  return prisma.order.findMany({

    where: {

      userId:user.id,

    },


    orderBy: {

      createdAt:"desc",

    },


    include: {

      payment:true,


      items: {

        include: {

          product:true,

        },

      },

    },

  });


}






export async function createOrder(
data:CreateOrderData
){


  const session = await auth();



  const user =
    await prisma.user.findUnique({

      where: {

        email:
session?.user?.email ?? "",

      },


      include: {

        cart: {

          include: {

            items: {

              include: {

                product:true,

              },

            },

          },

        },

      },

    });




  if(!user){

    throw new Error(
      "User not found."
    );

  }





  if(!user.cart || user.cart.items.length===0){

    throw new Error(
      "Cart is empty."
    );

  }




  for(const item of user.cart.items){


    if(!item.product.isActive){

      throw new Error(
        `${item.product.name} is unavailable.`
      );

    }



    if(item.product.stock < item.quantity){

      throw new Error(
        `Only ${item.product.stock} ${item.product.name} left.`
      );

    }

  }





  const subtotal =
    user.cart.items.reduce(

      (sum,item)=>

        sum +
        Number(item.product.price) *
        item.quantity,

      0

    );




  const shipping =
    data.city.trim().toLowerCase()==="karachi"
    ? 200
    : 300;




  const discount = 0;


  const total =
    subtotal + shipping - discount;





  const order =
    await prisma.$transaction(

      async(tx)=>{


        for(const item of user.cart!.items){


          const updated =
          await tx.product.updateMany({

            where:{

              id:item.productId,

              stock:{
                gte:item.quantity,
              },

            },


            data:{

              stock:{
                decrement:item.quantity,
              },

            },

          });



          if(updated.count===0){

            throw new Error(
              `${item.product.name} just sold out.`
            );

          }

        }





        const address =
await tx.address.create({

data:{

userId:user.id,

fullName:data.fullName,

phone:data.phone,

addressLine:data.addressLine,

city:data.city,

province:data.province,

},

});






        const order =
await tx.order.create({

data:{

userId:user.id,

addressId: address.id,

subtotal,

shipping,

discount,

total,

orderNumber:
`AERO-${Date.now()}`,

},

});






        await tx.orderItem.createMany({

          data:

          user.cart!.items.map(item=>({

            orderId:order.id,

            productId:item.productId,

            quantity:item.quantity,

            price:item.product.price,

          })),

        });







        await tx.payment.create({

          data:{

            orderId:order.id,

            amount:total,

            method:PaymentMethod.COD,

            status:PaymentStatus.PENDING,

          },

        });






        for(const item of user.cart?.items ?? []){


          await tx.inventoryMovement.create({

            data:{

              id:crypto.randomUUID(),

              productId:item.productId,

              type:"OUT",

              quantity:item.quantity,

              reason:
                `Order ${order.orderNumber}`,

            },

          });


        }






        await tx.cartItem.deleteMany({

          where:{

            cartId: user.cart!.id,

          },

        });




        return order;


      }

    );







  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath("/checkout");
  revalidatePath("/orders");



  return order;


}






export async function getOrderById(
orderId:string
){


  const user =
    await getCurrentUser();




  const order =
    await prisma.order.findFirst({

      where:{

        id:orderId,

        userId:user.id,

      },


      include:{

payment:true,

address:true,


        items:{

          include:{

            product:{

              include:{

                images:{

                  orderBy:{

                    sortOrder:"asc",

                  },

                },

              },

            },

          },

        },

      },

    });





  if(!order){

    throw new Error(
      "Order not found."
    );

  }




  return order;


}






export async function getAllOrders(){


return prisma.order.findMany({

orderBy:{

createdAt:"desc",

},


include:{

user:true,

payment:true,


items:{

include:{

product:{

include:{

images:{

take:1,

orderBy:{

sortOrder:"asc",

},

},

},

},

},

},


},


});

}







export async function getOrderForAdmin(
id:string
){


const order =
await prisma.order.findUnique({

where:{

id,

},


include:{

user:true,

payment:true,

address:true,


items:{

include:{

product:{

include:{

images:{

orderBy:{

sortOrder:"asc",

},

},

},

},

},

},


},


});



if(!order){

throw new Error(
"Order not found."
);

}


return order;


}







export async function updateOrderStatus(
id:string,
status:OrderStatus
){


await prisma.order.update({

where:{

id,

},


data:{

status,

},

});



revalidatePath("/dashboard/orders");

revalidatePath(
`/dashboard/orders/${id}`
);


}







export async function updatePaymentStatus(
id:string,
status:PaymentStatus
){


const order =
await prisma.order.findUnique({

where:{

id,

},


include:{

payment:true,

},

});



if(!order?.payment){

throw new Error(
"Payment not found."
);

}



await prisma.payment.update({

where:{

id:order.payment.id,

},


data:{

status,

},

});



revalidatePath("/dashboard/orders");

revalidatePath(
`/dashboard/orders/${id}`
);


}