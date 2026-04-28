import type { OnInit } from '@angular/core'
import { Component, computed, effect, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { PokemonDetail } from './components/pokemon-detail/pokemon-detail'
import { PokemonList } from './components/pokemon-list/pokemon-list'
import { TypeList } from './components/type-list/type-list'
import { PokemonService } from './services/pokemon.service'
import { TypesService } from './services/types.service'
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
  imports: [TypeList, PokemonList, PokemonDetail, FormsModule],
  template: `
    <header class="flex h-20 items-center justify-center bg-linear-90 from-[#2e418e] to-[#da3b41] text-white">
      <h1 class="text-2xl font-bold">Pokédex</h1>
    </header>
    <main class="min-h-[calc(100dvh-5rem)] px-8 py-4">
      <input
        type="search"
        class="row-start-1 h-11 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 hover:bg-red-400/10 focus:border-red-300 focus:bg-red-500/10 focus:ring-2 focus:ring-red-400 focus:outline-none md:col-span-3"
        placeholder="Buscar..."
        [(ngModel)]="searchedText"
      />
      <div class="grid-rows-auto mt-4 grid gap-12 lg:max-h-[calc(100dvh-12rem)] lg:grid-cols-3 lg:grid-rows-1">
        <app-type-list [types]="filteredTypes()" (selected)="onSelectedType($event)"></app-type-list>
        <app-pokemon-list [pokemonList]="filteredPokemons()" (selected)="onSelectedPokemon($event)"></app-pokemon-list>
        <app-pokemon-detail [pokemon]="selectedPokemon()"></app-pokemon-detail>
      </div>
    </main>
  `,
})
export class App implements OnInit {
  private typesList = inject(TypesService)
  private snackbar = inject(MatSnackBar)
  private pokemonsList = inject(PokemonService)

  pokemons = this.pokemonsList.pokemonsList
  types = this.typesList.typesList

  selectedType = signal<PokemonType | null>(null)
  selectedPokemon = signal<Pokemon | null>(null)
  searchedText = signal('')

  filteredTypes = computed(() => {
    const searchedText = this.searchedText().toLowerCase()
    const types = this.types()

    if (!searchedText) return types

    return types.filter((type) => type.name.toLowerCase().includes(searchedText))
  })

  filteredPokemons = computed(() => {
    const selectedType = this.selectedType()
    const pokemons = this.pokemons()

    if (selectedType) {
      return pokemons.filter((pokemon) => pokemon.types.some((type) => type.id === selectedType.id))
    }

    const searchedText = this.searchedText().toLowerCase()

    if (!searchedText) return pokemons

    return pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchedText))
  })

  constructor() {
    effect(() => {
      if (this.searchedText()) this.selectedType.set(null)
    })
  }

  ngOnInit() {
    void this.typesList.load().then((res) => {
      if (!res.ok) this.snackbar.open(res.error, '', { duration: 3000 })
    })

    void this.pokemonsList.load().then((res) => {
      if (!res.ok) this.snackbar.open(res.error, '', { duration: 3000 })
    })
  }

  onSelectedType($event: PokemonType) {
    this.selectedType.set($event)
  }

  onSelectedPokemon($event: Pokemon) {
    this.selectedPokemon.set($event)
  }
}
