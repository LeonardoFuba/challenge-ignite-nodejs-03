import { unlink } from 'node:fs'
import { join } from 'node:path'

export function removeLocalFile(fileToRemove: string, path: string) {
  unlink(join(path, fileToRemove), (err) => {
    if (err) throw err
    console.log(`${fileToRemove} was deleted.`)
  })
}
