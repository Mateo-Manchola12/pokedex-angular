import { Component, input } from '@angular/core'
import type { Pokemon } from '../../types/pokemon'

/**
 * Component to display a single Pokémon card.
 *
 * @remarks
 * This component receives a Pokémon object as input and renders its details using the template.
 */
@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  /**
   * The Pokémon object to display in the card.
   */
  pokemon = input<Pokemon>()
}
