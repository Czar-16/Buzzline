import dbConnect from "@/lib/dbConnect";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const user = getUserFromToken(req);
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Access Granted",
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
