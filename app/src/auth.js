import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import NextAuth from "next-auth";
import Google from 'next-auth/providers/google'

export const {handlers,signIn, signOut, auth} = NextAuth(() => {
    const pool = new Pool ({connectionString : process.env.DATABASE_URL})
    return {
        adapter : NeonAdapter(pool),
        providers : [
            Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret : process.env.AUTH_GOOGLE_SECRET
            })
        ],
        pages : {
            signIn : "/login"
        },
        callbacks : {
            async jwt({token,user}){
                // When the user logs in. 'user' contains the data from our Neon DB
                if(user){
                    token.role = user.role;
                    token.is_onboarded = user.is_onboarded;
                    token.id = user.id
                }

                return token
            },
            async session ({session,token}){
                if(token){
                    session.user.id = token.id,
                    session.user.role = token.role,
                    session.user.is_onboarded = token.is_onboarded
                }

                return session;
                
            }
        }
    }
    
})