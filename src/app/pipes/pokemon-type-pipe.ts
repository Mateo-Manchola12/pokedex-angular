import type { PipeTransform, Signal } from '@angular/core'
import { Pipe, inject, signal } from '@angular/core'
import { TypesService } from '../services/types.service'
import type { PokemonType } from '../types/pokemon-type'

/**
 * Angular pipe to retrieve a Pokémon type by its ID using the TypesService.
 *
 * @remarks
 * This pipe returns a signal with the Pokémon type object or undefined if not found.
 */
@Pipe({
  name: 'pokemonTypePipe',
})
export class PokemonTypePipe implements PipeTransform {
  /**
   * Instance of TypesService for accessing Pokémon types.
   * @internal
   */
  typeService = inject(TypesService)

  /**
   * Transforms a Pokémon type ID into a signal of the corresponding PokémonType object.
   *
   * @param value - The ID of the Pokémon type.
   * @returns A signal containing the PokémonType or undefined.
   */
  transform(value: number): Signal<PokemonType | undefined> {
    //return this.typeService.getById(value)
    return signal(undefined).asReadonly()
  }
}
