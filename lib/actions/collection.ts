"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";



export async function getCollections(){

return prisma.collection.findMany({

orderBy:{
sortOrder:"asc",
},

});

}


export async function createCollection(
formData: FormData
){

await prisma.collection.create({

data:{

name:
String(formData.get("name")),

slug:
String(formData.get("slug")),

description:
String(formData.get("description") || ""),

image:
String(formData.get("image")),

featured:
formData.get("featured") === "on",

sortOrder:
Number(formData.get("sortOrder") || 0),

},

});


revalidatePath("/dashboard/collections");
revalidatePath("/");

}


export async function deleteCollection(
id:string
){

await prisma.collection.delete({

where:{
id,
},

});


revalidatePath("/");
revalidatePath("/dashboard/collections");

}