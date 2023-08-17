import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "../../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password New", type: "password" },
      },
      async authorize(credentials) {
       
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials?.email,
            credentials?.password
          );

          const user = userCredential?.user;

          if (user) {
            return {
              id: user.id,
              name: user?.username,
              role: 'Admin',
              email:  user?.email,
              image: "",
              isAdmin: true,
              accessToken: user?.token,
            };
          }
        } catch (err) {
          const errCode = err.errCode;
          const errMessage = err.message;
          console.log(errMessage);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        // token.token = user.accessToken;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
