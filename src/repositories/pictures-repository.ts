import { Prisma, Picture as PrismaPictureModel } from '@prisma/client'

export type Picture = PrismaPictureModel
export type PictureCreateInput = Prisma.PictureUncheckedCreateInput

export const PAGE_LENGTH = 20

export interface PicturesRepository {
  createMany(
    data: PictureCreateInput[],
  ): Promise<Pick<Picture, 'id' | 'key' | 'url'>[]>
  findById(id: string): Promise<Picture | null>
  findManyByPetId(petId: string): Promise<Picture[]>
}
