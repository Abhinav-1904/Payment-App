import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'


const prisma=new PrismaClient()

async function main() {

    const alice=await prisma.user.upsert({
        where:{
            mobile_number:"1212121212"
        },
        update:{},
        create:{
            mobile_number:"1212121212",
            password:await bcrypt.hash('Alice@123',10),
            name:"Alice",
            Balance:{
                create:{
                    amount:2020,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    status:"Success",
                    startTime:new Date(),
                    amount:2020,
                    token:"token_1",
                    provider:"HDFC Bank"
                }
            }
        }
    })
    const Bob=await prisma.user.upsert({
        where:{
            mobile_number:"2323232323"
        },
        update:{},
        create:{
            name:"Bob",
            password:await bcrypt.hash("Bob@123",10),
            mobile_number:"2323232323",
            Balance:{
                create:{
                    amount:2000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    token:"token_2",
                    provider:"HDFC Bank",
                    amount:2000
                }
            }
        }
    })
    console.log(Bob)
    console.log(alice)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})