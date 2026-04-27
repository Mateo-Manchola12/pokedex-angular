import type { PipeTransform } from '@angular/core'
import { Pipe } from '@angular/core'

/**
 * Angular pipe to convert a Pokémon level number into a descriptive string.
 *
 * @remarks
 * This pipe is used to display a label based on the Pokémon's level.
 *
 * - 0-20: "pringao"
 * - 21-40: "tranqui"
 * - 41+: "cheto"
 */
@Pipe({
  name: 'pokemonLevel',
})
export class PokemonLevelPipe implements PipeTransform {
  /**
   * Transforms a Pokémon level into a descriptive string.
   *
   * @param value - The Pokémon level as a number.
   * @returns The corresponding label for the level.
   */
  transform(value: number): string {
    if (value <= 20) {
      return 'pringao'
    } else if (20 < value && value <= 40) {
      return 'tranqui'
    } else {
      return 'cheto'
    }
  }
}
