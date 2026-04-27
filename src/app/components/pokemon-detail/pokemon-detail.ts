import { Component, inject, input, signal } from '@angular/core'
import { PokemonLevelPipe } from '../../pipes/pokemon-level-pipe'
import { PokemonTypePipe } from '../../pipes/pokemon-type-pipe'
import { TypesService } from '../../services/types-service'
import type { Pokemon } from '../../types/pokemon'
import type { PokemonType } from '../../types/pokemon-type'

/**
 * Component to display detailed information about a Pokémon.
 *
 * @remarks
 * This component receives a Pokémon object as input and displays its details, including its types.
 */
@Component({
  selector: 'app-pokemon-detail',
  imports: [PokemonLevelPipe, PokemonTypePipe],
  templateUrl: './pokemon-detail.html',
})
export class PokemonDetail {
  /**
   * The Pokémon object to display in detail.
   */
  pokemon = input<Pokemon>()

  /**
   * Signal containing the list of Pokémon types for the current Pokémon.
   */
  types = signal<PokemonType[]>([])

  /**
   * Instance of TypesService for accessing Pokémon types.
   * @internal
   */
  typeService = inject(TypesService)
}
