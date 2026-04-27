import { Component, computed, effect, inject, signal } from '@angular/core'
import { PokemonDetail } from './components/pokemon-detail/pokemon-detail'
import { PokemonList } from './components/pokemon-list/pokemon-list'
import { TypeList } from './components/type-list/type-list'
import { PokemonService } from './services/pokemon-service'
import { TypesService } from './services/types-service'
import type { Pokemon } from './types/pokemon'
import type { PokemonType } from './types/pokemon-type'

/**
 * Root component for the Pokédex Angular application.
 *
 * @remarks
 * This component manages the main layout, search, filtering, and selection logic for Pokémon and types.
 */
@Component({
  selector: 'app-root',
  imports: [TypeList, PokemonList, PokemonDetail],
  template: `
    <header class="flex h-20 items-center justify-center bg-linear-90 from-[#2e418e] to-[#da3b41] text-white">
      <h1 class="text-2xl font-bold">Pokédex</h1>
    </header>
    <main class="min-h-[calc(100dvh-5rem)] px-8 py-4">
      <input
        (input)="onInput($event)"
        [value]="searchedText()"
        class="row-start-1 h-11 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 hover:bg-red-400/10 focus:border-red-300 focus:bg-red-500/10 focus:ring-2 focus:ring-red-400 focus:outline-none md:col-span-3"
        placeholder="Buscar..."
      />
      <div class="grid-rows-auto mt-4 grid gap-12 md:max-h-[calc(100dvh-12rem)] md:grid-cols-3 md:grid-rows-1">
        <app-type-list [types]="filteredTypesList()" (selected)="onSelectedType($event)"></app-type-list>
        <app-pokemon-list
          [pokemonList]="filteredPokemonList()"
          (selected)="onSelectedPokemon($event)"
        ></app-pokemon-list>
        <app-pokemon-detail [pokemon]="selectedPokemon()"></app-pokemon-detail>
      </div>
    </main>
  `,
})
export class App {
  /**
   * Service for retrieving Pokémon data.
   * @internal
   */
  private readonly pokemonService = inject(PokemonService)
  /**
   * Service for retrieving Pokémon types.
   * @internal
   */
  private readonly typesService = inject(TypesService)

  /**
   * Signal containing the list of Pokémon types.
   */
  protected typesList = this.typesService.typesList
  /**
   * Signal containing the list of Pokémon.
   */
  protected pokemonsList = this.pokemonService.pokemonList

  /**
   * Computed signal for the filtered list of Pokémon types based on search text.
   */
  protected filteredTypesList = computed(() => {
    const search = this.searchedText().trim().toLocaleLowerCase()
    const typeList = this.typesList()

    if (!search) return typeList

    return typeList.filter((t) => t.name.toLocaleLowerCase().includes(search))
  })

  /**
   * Computed signal for the filtered list of Pokémon based on selected type or search text.
   */
  protected filteredPokemonList = computed(() => {
    const type = this.selectedType()
    const pokemonList = this.pokemonsList()

    if (type) return pokemonList.filter((p) => p.types.includes(type.id))

    const search = this.searchedText().trim().toLocaleLowerCase()

    if (!search) return pokemonList

    return pokemonList.filter((p) => p.name.toLocaleLowerCase().includes(search))
  })

  /**
   * Signal for the currently selected Pokémon.
   */
  protected selectedPokemon = signal<Pokemon | undefined>(undefined)
  /**
   * Signal for the currently selected Pokémon type.
   */
  protected selectedType = signal<PokemonType | undefined>(undefined)

  /**
   * Signal for the current search text.
   */
  protected searchedText = signal<string>('')

  /**
   * Sets up effects to persist selected Pokémon and type to local storage.
   */
  constructor() {
    effect(() => {
      const pokemon = this.selectedPokemon()
      if (pokemon) localStorage.setItem('pokemon-selected', pokemon.name)
    })

    effect(() => {
      const type = this.selectedType()
      if (type) localStorage.setItem('tipo-selected', type.name)
    })
  }

  /**
   * Handles input event for search text and resets selected type.
   *
   * @param input - The input event from the search box.
   */
  onInput(input: Event) {
    const target = input.target as HTMLInputElement
    this.searchedText.set(target.value)
    this.selectedType.set(undefined)
  }

  /**
   * Handles selection of a Pokémon type.
   *
   * @param type - The selected Pokémon type.
   */
  onSelectedType(type: PokemonType) {
    this.selectedType.set(this.typesList().find((t) => t.id === type.id))
  }

  /**
   * Handles selection of a Pokémon.
   *
   * @param pokemon - The selected Pokémon.
   */
  onSelectedPokemon(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon)
  }

  /**
   * Loads selected Pokémon and type from local storage and updates signals.
   */
  loadLocalStorage() {
    const pokeLS = localStorage.getItem('pokemon-selected')
    const tipoLS = localStorage.getItem('tipo-selected')

    const pokemonEncontrado = this.pokemonsList().find((pok) => pok.name === pokeLS)

    const tipoEncontrado = this.typesList().find((pok) => pok.name === (pokemonEncontrado?.types[0] || tipoLS))

    this.selectedType.set(tipoEncontrado)
    this.selectedPokemon.set(pokemonEncontrado)
  }
}
