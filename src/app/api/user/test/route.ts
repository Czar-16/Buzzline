// testing if the object is creating in the DB

import dbConnect from "@/lib/dbConnect"
import User from "@/models/User";


export async function GET(){
  try {
    await dbConnect();
    const user = await User.create({
      username: "test",
      email: "testbuzzline@gmail.com",
      password: "123456"
      
    })

     return Response.json({
       success: true,
       user,
     });
    
  } catch (error : any) {
    return Response.json({
      success: false,
      error: error.message
    })
  }
}