import { Prisma, Requirement as PrismaRequirementModel } from '@prisma/client'

export type Requirement = PrismaRequirementModel
export type RequirementsCreateInput = Prisma.RequirementUncheckedCreateInput

export const PAGE_LENGTH = 20

export interface RequirementsRepository {
  createMany(data: RequirementsCreateInput[]): Promise<Requirement[]>
  findById(id: string): Promise<Requirement | null>
  findManyByPetId(petId: string): Promise<Requirement[]>
}
