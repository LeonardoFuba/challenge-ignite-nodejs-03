import { randomUUID } from 'node:crypto'
import { join, resolve } from 'node:path'

export function fakeUploadImageProps(id: string | number) {
  const key = randomUUID()
  const fileName = `my-pet-image-${id}.png`
  const destinationPath = join('path/to/project', 'tmp')

  const fakeMulterFile = {
    originalname: fileName,
    encoding: '7bit',
    mimetype: 'image/png',
    destination: destinationPath,
    filename: `${key}-${fileName}`,
    path: join(destinationPath, `${key}-${fileName}`),
    size: 76750,
  }

  return {
    name: fakeMulterFile.originalname,
    size: fakeMulterFile.size,
    key: fakeMulterFile.filename,
    url: resolve('tmp', fakeMulterFile.filename),
  }
}
