import { Component, input, output } from '@angular/core'
import type { Pokemon } from '../../types/pokemon'
import { PokemonCard } from '../pokemon-card/pokemon-card'

/**
 * Component to display a list of Pokémon cards and handle selection.
 *
 * @remarks
 * This component receives a list of Pokémon and emits an event when a Pokémon is selected.
 */
@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
  /**
   * The list of Pokémon to display.
   */
  pokemonList = input<Pokemon[]>()

  /**
   * Event emitter for the selected Pokémon.
   */
  selected = output<Pokemon>()

  /**
   * Handles the selection of a Pokémon and emits the selected event.
   *
   * @param selected - The selected Pokémon object.
   */
  onSelectedPokemon(selected: Pokemon) {
    this.selected.emit(selected)
  }
}
