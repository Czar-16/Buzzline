import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();
    
    // input validation
    if (!username || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "username or email already exist",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return Response.json({
      success: true,
      message: "user created successfully",
    },{
      status: 201
    });

  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
    },{
      status: 500
    });
  }
}
