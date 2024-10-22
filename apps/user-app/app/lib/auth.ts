import { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import bcrypt from "bcrypt"
import prisma from "@repo/db/client"
import  CredentialsProvider from "next-auth/providers/credentials"
import {signinInput} from "@repo/schemas/signInInputs"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"


export const authOptions={
    providers:[
        CredentialsProvider({
            name:'Mobile Number',
            credentials:{
                name:{label:'Name',type:'text',placeholder:'Name',required:true},
                password:{label:'Password',type:'password',placeholder:'Password',required:true},
                mobile_number:{label:'Mobile number',type:'text',placeholder:'Enter number',required:true}
                
            },

            async authorize(credentials:any) {
                const parsed = signinInput.safeParse(credentials);
                if (!parsed.success) {
                    console.log(parsed.error); 
                    return null; 
                }
                const existingUser= await prisma.user.findFirst({
                    where:{
                        mobile_number:credentials.mobile_number
                    }
                })
                if(existingUser){
                    const validation=await bcrypt.compare(credentials.password,existingUser.password)
                    if(validation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            mobile_number:existingUser.mobile_number
                        }
                    }
                    if (!validation) {
                        throw new Error("Incorrect password");
                    }
                }
                try {
                    const hashedPassword= await bcrypt.hash(credentials.password,10)
                    const user = await prisma.user.create({
                        data: {
                            name: credentials.name,
                            mobile_number: credentials.mobile_number,
                            password: hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        mobile_number: user.mobile_number
                    };
                } catch (e) {
                    console.error(e);
                    throw new Error("Unable to create user");
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],

    secret:process.env.NEXTAUTH_SECRET,

    callbacks:{
        async signIn({user,account,profile}){
            if(account?.provider==='github' || account?.provider==='google'){
                const existinguser=await prisma.user.findUnique({
                    where:{
                        email:user?.email as string
                    }
                })
                if(!existinguser?.mobile_number){
                    return '/signin?message=First signup with your phone number'
                }
            }
            return true
            
        },
        async session({token,session}:{
            token:JWT,
            session:Session
        }){
            if(token.sub && session.user){
                session.user.id=token.sub
            }
            return session 
        } 
    },
    pages:{
        signIn:'/signin'
    }
} satisfies NextAuthOptions