// test the db connecting or not
import dbConnect from "@/lib/dbConnect";

export async function GET(){
  try {
    await dbConnect();
    return Response.json({
      success: true,
      message: "Database Connected"
    })
  } catch (error : any) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }

}