"use server";


import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";




function slugify(text:string){


return text
.toLowerCase()
.trim()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-+|-+$/g,"");


}








export async function getCategories(){


return prisma.category.findMany({


include:{


_count:{


select:{


products:{


where:{


deletedAt:null,


isActive:true,


},


},


},


},


},


orderBy:{


name:"asc",


},


});


}









export async function getCategory(id:string){


return prisma.category.findUnique({


where:{


id,

},


});


}









export async function createCategory(
formData:FormData
):Promise<void>{



const name =
String(
formData.get("name") || ""
);



const description =
String(
formData.get("description") || ""
);





if(!name){


throw new Error(
"Category name required"
);


}






const slug =
slugify(name);






const existing =
await prisma.category.findUnique({


where:{


slug,

},


});






if(existing){


throw new Error(
"Category already exists"
);


}








await prisma.category.create({


data:{


name,


slug,


description:
description || null,


},


});








revalidatePath(
"/dashboard/categories"
);


revalidatePath(
"/dashboard/settings"
);


revalidatePath(
"/products"
);


revalidatePath(
"/"
);


}









export async function updateCategory(
id:string,
formData:FormData
):Promise<void>{



const name =
String(
formData.get("name") || ""
);




const description =
String(
formData.get("description") || ""
);







await prisma.category.update({


where:{


id,

},



data:{


name,


slug:slugify(name),


description:
description || null,


},


});







revalidatePath(
"/dashboard/categories"
);


revalidatePath(
"/dashboard/settings"
);


revalidatePath(
"/products"
);


revalidatePath(
"/"
);



}









export async function deleteCategory(
id:string
):Promise<void>{



const products =
await prisma.product.count({


where:{


categoryId:id,

},


});







if(products > 0){


throw new Error(
"Cannot delete category with products"
);


}








await prisma.category.delete({


where:{


id,

},


});








revalidatePath(
"/dashboard/categories"
);


revalidatePath(
"/dashboard/settings"
);


revalidatePath(
"/products"
);


revalidatePath(
"/"
);



}