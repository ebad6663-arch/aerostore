import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req:NextRequest){

const path=req.nextUrl.pathname;


if(
path.startsWith("/dashboard") &&
!path.startsWith("/dashboard/login")
){

const admin=req.cookies.get("aero_admin");


if(admin?.value !== "true"){

return NextResponse.redirect(
new URL("/dashboard/login",req.url)
);

}

}


return NextResponse.next();

}


export const config={
matcher:[
"/dashboard/:path*"
]
};