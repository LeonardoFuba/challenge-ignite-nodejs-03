import { randomUUID } from 'crypto'
import {
  Picture,
  PictureCreateInput,
  PicturesRepository,
} from '../pictures-repository'

export class InMemoryPicturesRepository implements PicturesRepository {
  public pictures: Picture[] = []

  async findById(id: string) {
    return Promise.resolve(this.pictures.find((item) => item.id === id) ?? null)
  }

  async findManyByPetId(petId: string) {
    return Promise.resolve(
      this.pictures.filter((item) => item.pet_id === petId),
    )
  }

  async createMany(data: PictureCreateInput[]) {
    const newPictures = data.map((picture) => {
      const newPicture = {
        id: picture.id ?? randomUUID(),
        name: picture.name,
        size: picture.size,
        key: picture.key,
        url: picture.url,
        pet_id: picture.pet_id,
      } as Picture

      this.pictures.push(newPicture)

      return newPicture
    })

    return Promise.resolve(newPictures)
  }
}
