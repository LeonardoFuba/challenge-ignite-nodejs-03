export class CityIsRequiredError extends Error {
  constructor() {
    super('The city is required.')
  }
}
