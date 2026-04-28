import type { PokemonType } from './pokemon-type'

export interface Pokemon {
  id: number
  name: string
  types: PokemonType[]
  imageUrl: string
  description: string
  attack: string
  defense: string
  hp: number
}
