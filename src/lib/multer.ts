import multer from 'fastify-multer'
import { randomUUID } from 'node:crypto'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

export const options = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const fileName = `${randomUUID()}-${file.originalname}`

      return cb(null, fileName)
    },
  }),
}
