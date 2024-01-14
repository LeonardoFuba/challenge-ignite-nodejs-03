import { Prisma, Organization as PrismaOrganizationModel } from '@prisma/client'

export type Organization = PrismaOrganizationModel
export type OrganizationCreateInput = Prisma.OrganizationCreateInput
export interface Location {
  city: string
}

export interface OrganizationsRepository {
  create(data: OrganizationCreateInput): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findManyByCity(location: Location): Promise<Organization[]>
}
