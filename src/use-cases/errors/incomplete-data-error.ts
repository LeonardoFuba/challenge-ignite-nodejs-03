export class IncompleteDataError extends Error {
  constructor(dataName: string) {
    super(`The ${dataName} is required.`)
  }
}
