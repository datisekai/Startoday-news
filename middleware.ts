import { NextRequest, NextResponse } from "next/server";
import { store } from "./src/redux/store";

export default function middleware(req: NextRequest) {
  const { token }: any = store.getState().Auth;
  let url = req.url;

  // const roleParse = role?.split("role=")[1];

  // if (!token && url.includes("/admin")) {
  //   return NextResponse.redirect(
  //     `${
  //       process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"
  //     }/dang-nhap`
  //   );
  // }

  // if (token && url.includes("/dang-nhap")) {
  // if (+roleParse !== 0) {
  // return NextResponse.redirect(
  // `${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/admin`
  // );
  // } else {
  //   return NextResponse.redirect(
  //     `${process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000"}/`
  //   );
  // }
  // }
}

// Supports both a single string value or an array of matchers
// export const config = {
//   matcher: ["/:path*", "/admin/:path*"],
// };
