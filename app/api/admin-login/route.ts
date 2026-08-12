import { NextResponse } from "next/server";


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const {
      username,
      password,
    } = body;


    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        {
          status: 401,
        }
      );

    }


    return NextResponse.json({
      success: true,
      message: "Login successful",
    });


  } catch {

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }

}