import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "9ed126be9636ccb85a22",
      clientSecret: "ec162f8962f830bd1841bce32e0472d15fcccdcc",
    }),
    
    
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)