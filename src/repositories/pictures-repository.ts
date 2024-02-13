import { Prisma, Picture as PrismaPictureModel } from '@prisma/client'

export type Picture = PrismaPictureModel
export type PictureCreateInput = Prisma.PictureUncheckedCreateInput

export const PAGE_LENGTH = 20

export interface PicturesRepository {
  createMany(data: PictureCreateInput[]): Promise<Picture[]>
  findById(id: string): Promise<Picture | null>
  findManyByPetId(petId: string): Promise<Picture[]>
}
