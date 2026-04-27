import { Component, input } from '@angular/core'
import { type PokemonType } from '../../types/pokemon-type'

/**
 * Component to display a single Pokémon type card.
 *
 * @remarks
 * This component receives a Pokémon type object as input and renders its details using the template.
 */
@Component({
  selector: 'app-type-card',
  imports: [],
  templateUrl: './type-card.html',
})
export class TypeCard {
  /**
   * The Pokémon type object to display in the card.
   */
  type = input<PokemonType>()
}
