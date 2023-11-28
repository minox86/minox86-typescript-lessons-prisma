import { PrismaClient } from '@prisma/client'
import util from 'node:util'

const prisma = new PrismaClient()

async function main() {
  await seedDatabase()

  const users = await prisma.user.findMany()

  console.log(
    util.inspect(users, { showHidden: false, depth: null, colors: true }),
  )
}

async function seedDatabase() {
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      email: 'fred@domain,com',
      name: 'Fred',
      posts: {
        create: [
          { title: 'First Fred post', content: 'Post 1', published: true },
          { title: 'Second Fred post', content: 'Post 2', published: true },
        ],
      },
    },
  })
  await prisma.user.create({
    data: {
      email: 'wilma@domain,com',
      name: 'Wilma',
      posts: {
        create: [
          { title: 'First Wilma post', content: 'Post 3', published: true },
          { title: 'Second Wilma post', content: 'Post 4', published: true },
        ],
      },
    },
  })
}

main().then(() => {
  console.log('Terminated.')
})
