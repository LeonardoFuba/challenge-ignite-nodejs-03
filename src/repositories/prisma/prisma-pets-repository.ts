import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  Characteristics,
  PAGE_LENGTH,
  PetsRepository,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchManyByCity(
    organizationsIdOnCity: string[],
    characteristics: Characteristics,
    page: number,
  ) {
    const { age, size, energyLevel, independenceLevel, environment } =
      characteristics

    const pets = await prisma.pet.findMany({
      where: {
        organization_id: { in: organizationsIdOnCity },
        ...(age && { age }),
        ...(size && { size }),
        ...(energyLevel && { energy_level: energyLevel }),
        ...(independenceLevel && { independence_level: independenceLevel }),
        ...(environment && { environment }),
      },
      take: PAGE_LENGTH,
      skip: (page - 1) * PAGE_LENGTH,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
