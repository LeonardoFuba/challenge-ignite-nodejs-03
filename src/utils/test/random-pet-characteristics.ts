import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Size,
} from '@/repositories/pets-repository'
import { randomInt } from 'node:crypto'

export function randomPetAge() {
  const ages: Array<Age> = ['Filhote', 'Adulto']

  return ages[randomInt(ages.length)]
}
export function randomPetEnergyLevel() {
  const energyLevels: Array<EnergyLevel> = [
    'Muito baixa',
    'Baixa',
    'Média',
    'Muita energia',
    'Elétrico',
  ]

  return energyLevels[randomInt(energyLevels.length)]
}
export function randomPetIndependenceLevel() {
  const independenceLevels: Array<IndependenceLevel> = [
    'Baixo',
    'Médio',
    'Alto',
  ]

  return independenceLevels[randomInt(independenceLevels.length)]
}
export function randomPetSize() {
  const sizes: Array<Size> = ['Pequenino', 'Médio', 'Grandalhão']

  return sizes[randomInt(sizes.length)]
}

export function randomPetEnvironment() {
  const environments: Array<Environment> = [
    'Ambiente pequeno',
    'Ambiente amplo',
    'Ambiente aberto',
  ]

  return environments[randomInt(environments.length)]
}
