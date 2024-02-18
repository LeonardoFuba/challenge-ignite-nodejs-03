import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { Location, OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findManyByCity(location: Location) {
    const organizations = await prisma.organization.findMany({
      where: {
        city: location.city,
      },
    })

    return organizations
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
