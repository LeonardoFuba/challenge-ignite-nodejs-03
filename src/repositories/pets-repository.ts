import { Prisma, Pet as PrismaPetModel } from '@prisma/client'
import { Picture } from './pictures-repository'
import { Requirement } from './requirements-repository'

export type Age = 'Filhote' | 'Adulto'
export type Size = 'Pequenino' | 'Médio' | 'Grandalhão'
export type EnergyLevel =
  | 'Muito baixa'
  | 'Baixa'
  | 'Média'
  | 'Muita energia'
  | 'Elétrico'
export type IndependenceLevel = 'Baixo' | 'Médio' | 'Alto'
export type Environment =
  | 'Ambiente pequeno'
  | 'Ambiente amplo'
  | 'Ambiente aberto'

export type Characteristics = {
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  independenceLevel?: IndependenceLevel
  environment?: Environment
}

export type PetCreateInput = Prisma.PetUncheckedCreateInput
export type Pet = PrismaPetModel

export type PetCharacteristics = Pet & {
  pictures: Picture[]
  requirements: Requirement[]
}

export const PAGE_LENGTH = 20

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchManyByCity(
    organizationsIdOnCity: string[],
    characteristics: Characteristics,
    page: number,
  ): Promise<Pet[]>
}
