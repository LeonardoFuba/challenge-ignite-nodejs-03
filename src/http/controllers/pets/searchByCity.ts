import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyCityQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    state: z.string().optional(),
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independenceLevel: z.string().optional(),
  })

  const { page, city } = nearbyCityQuerySchema.parse(request.query)

  /* executando use-case */
  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({
    city,
    page,
  })

  return reply.status(200).send({ pets })
}
