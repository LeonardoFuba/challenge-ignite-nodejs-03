import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PicturesRepository } from '../pictures-repository'

export class PrismaPicturesRepository implements PicturesRepository {
  async findById(id: string) {
    const picture = await prisma.picture.findUnique({
      where: {
        id,
      },
    })

    return picture
  }

  async findManyByPetId(petId: string) {
    const pictures = await prisma.picture.findMany({
      where: {
        pet_id: petId,
      },
    })

    return pictures
  }

  async createMany(data: Prisma.PictureUncheckedCreateInput[]) {
    await prisma.picture.createMany({
      data,
    })

    return prisma.picture.findMany({
      where: {
        pet_id: data[0].pet_id,
      },
      select: {
        id: true,
        key: true,
        url: true,
      },
    })
  }
}
