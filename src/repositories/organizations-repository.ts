import { Prisma, Organization as PrismaOrganizationModel } from '@prisma/client'

export type Organization = PrismaOrganizationModel

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
