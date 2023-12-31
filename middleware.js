import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.

  {
    pages: {
      signIn: "/login/signin",
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
