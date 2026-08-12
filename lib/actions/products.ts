"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { ProductSchema } from "@/lib/validation";
import { generateSlug } from "@/lib/slug";
import { generateSKU } from "@/lib/sku";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";





export async function createProduct(formData: FormData) {


const images = JSON.parse(
(formData.get("images") as string) || "[]"
);




const validated = ProductSchema.parse({

name: formData.get("name"),

description: formData.get("description"),

price: formData.get("price"),

stock: formData.get("stock"),

categoryId: formData.get("categoryId"),

});





await prisma.$transaction(async(tx)=>{


const product = await tx.product.create({

data:{

...validated,

slug: await generateSlug(validated.name),

sku: await generateSKU(),

},


});





if(images.length > 0){


await tx.productImage.createMany({

data: images.map(

(
image:{
url:string;
publicId:string;
},
index:number
)=>(

{

productId:product.id,

url:image.url,

publicId:image.publicId,

sortOrder:index,

}

)

),


});


}



});





revalidatePath("/dashboard/products");

revalidatePath("/products");

revalidatePath("/");



redirect("/dashboard/products");


}









export async function getProducts(filters?:{

category?:string;

search?:string;

sort?:string;

inStock?:boolean;

}){



const where:Prisma.ProductWhereInput={


deletedAt:null,

isActive:true,


};







if(filters?.category){


where.category={

slug:filters.category,

};


}








if(filters?.search){



where.OR=[


{

name:{

contains:filters.search,

mode:"insensitive",

},

},



{

description:{

contains:filters.search,

mode:"insensitive",

},

},



];


}







if(filters?.inStock){


where.stock={

gt:0,

};


}








let orderBy:
Prisma.ProductOrderByWithRelationInput={


createdAt:"desc",


};







switch(filters?.sort){


case "price-low":


orderBy={

price:"asc",

};


break;






case "price-high":


orderBy={

price:"desc",

};


break;






case "name":


orderBy={

name:"asc",

};


break;



}









return prisma.product.findMany({


where,



include:{


category:true,



images:{


take:1,


orderBy:{


sortOrder:"asc",


},


},


},




orderBy,



});


}









export async function getFeaturedProducts(){



const settings =
await prisma.storeSettings.findFirst();




return prisma.product.findMany({


where:{


deletedAt:null,

isActive:true,

isFeatured:true,


},



include:{


category:true,


images:{


take:1,


orderBy:{


sortOrder:"asc",

},


},


},





take: settings?.featuredProductsLimit ?? 8,



orderBy:{


createdAt:"desc",


},



});



}









export async function getProductBySlug(
slug:string
){



return prisma.product.findFirst({


where:{


slug,


deletedAt:null,


isActive:true,


},



include:{


category:true,


images:true,


},


});


}









export async function deleteProduct(
id:string
){



await prisma.product.update({


where:{


id,

},



data:{


deletedAt:new Date(),


isActive:false,


},



});





revalidatePath("/dashboard/products");

revalidatePath("/products");

revalidatePath("/");



}









export async function toggleProductStatus(
id:string
){



const product =
await prisma.product.findUnique({

where:{

id,

},

});




if(!product) return;





await prisma.product.update({


where:{


id,

},



data:{


isActive:
!product.isActive,


},



});





revalidatePath("/dashboard/products");

revalidatePath("/products");



}









export async function updateProduct(
formData:FormData
){



const id =
formData.get("id") as string;



const images = JSON.parse(

(formData.get("images") as string) || "[]"

);






const validated = ProductSchema.parse({


name:formData.get("name"),


description:formData.get("description"),


price:formData.get("price"),


stock:formData.get("stock"),


categoryId:formData.get("categoryId"),


});








await prisma.$transaction(async(tx)=>{



await tx.product.update({


where:{


id,

},



data:validated,


});






await tx.productImage.deleteMany({


where:{


productId:id,

},


});






if(images.length >0){



await tx.productImage.createMany({


data:images.map(

(
image:{
url:string;
publicId:string;
},
index:number
)=>(

{


productId:id,


url:image.url,


publicId:image.publicId,


sortOrder:index,


}


)

),


});


}



});







revalidatePath("/dashboard/products");

revalidatePath("/products");

revalidatePath("/");



redirect("/dashboard/products");



}









export async function toggleFeaturedProduct(
id:string
){



const product =
await prisma.product.findUnique({

where:{

id,

},

});





if(!product) return;







await prisma.product.update({


where:{


id,

},



data:{


isFeatured:
!product.isFeatured,


},



});







revalidatePath("/dashboard/products");

revalidatePath("/");

revalidatePath("/products");



}









export async function getProductById(
id:string
){



const product =
await prisma.product.findUnique({


where:{


id,

},



include:{


images:{


orderBy:{


sortOrder:"asc",

},


},



category:true,


},


});






if(!product){


throw new Error("Product not found");


}




return product;



}