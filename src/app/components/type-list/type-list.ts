import { Component, input, output } from '@angular/core'
import type { PokemonType } from '../../types/pokemon-type'
import { TypeCard } from '../type-card/type-card'

/**
 * Component to display a list of Pokémon type cards and handle selection.
 *
 * @remarks
 * This component receives a list of Pokémon types and emits an event when a type is selected.
 */
@Component({
  selector: 'app-type-list',
  imports: [TypeCard],
  templateUrl: './type-list.html',
})
export class TypeList {
  /**
   * The list of Pokémon types to display.
   */
  types = input<PokemonType[]>()

  /**
   * Event emitter for the selected Pokémon type.
   */
  selected = output<PokemonType>()

  /**
   * Handles the selection of a Pokémon type and emits the selected event.
   *
   * @param selected - The selected Pokémon type object.
   */
  onSelectedType(selected: PokemonType) {
    this.selected.emit(selected)
  }
}
