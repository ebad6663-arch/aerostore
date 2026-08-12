import { createClient } from "@supabase/supabase-js";


const supabase = createClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.SUPABASE_SERVICE_ROLE_KEY!

);



export async function uploadFile(file: File) {


const bytes = await file.arrayBuffer();

const buffer = Buffer.from(bytes);



const extension =
file.name.split(".").pop();



const filename = 
`${crypto.randomUUID()}.${extension}`;



const path =
`products/${filename}`;



const { error } = await supabase.storage
.from("products")
.upload(
path,
buffer,
{
contentType:file.type,
cacheControl:"3600",
}
);



if(error){

throw new Error(
error.message
);

}





const {

data

} = supabase.storage
.from("products")
.getPublicUrl(path);





return {

url:data.publicUrl,

publicId:path,

};


}






export async function uploadProductImage(
file:File
){

return uploadFile(file);

}