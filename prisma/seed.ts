import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  prisma.rental.deleteMany();

  for (let i = 0; i < 15; i++) {
    const newRental = await prisma.rental.create({
      data: {
        book_id: faker.helpers.rangeToNumber({ min: 1, max: 50 }),
        start_date: faker.date.between({ from: '2000-01-01', to: Date.now() }),
        end_date: faker.date.between({ from: Date.now(), to: '2030-01-01' })
      }
    })
    console.log(newRental)
  }

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
