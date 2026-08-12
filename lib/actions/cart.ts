"use server";


import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";





async function getCurrentUser(){


const session =
await auth();



if(!session?.user?.email){

throw new Error("Not logged in");

}



const user =
await prisma.user.findUnique({

where:{
email:session.user.email,
},

});



if(!user){

throw new Error("User not found");

}



return user;


}








export async function getCart(){


const user =
await getCurrentUser();




const cart =
await prisma.cart.findUnique({


where:{

userId:user.id,

},



include:{


items:{


include:{


product:true,


},


},


},


});





return cart;

}









export async function syncCart(
items:{
productId:string;
quantity:number;
}[]
){



const user =
await getCurrentUser();





let cart =
await prisma.cart.findUnique({


where:{

userId:user.id,

},


});





if(!cart){


cart =
await prisma.cart.create({


data:{

userId:user.id,

},


});


}






await prisma.cartItem.deleteMany({


where:{

cartId:cart.id,

},


});







if(items.length > 0){


await prisma.cartItem.createMany({


data:items.map(item=>({


cartId:cart.id,


productId:item.productId,


quantity:item.quantity,


})),


});


}





return true;


}