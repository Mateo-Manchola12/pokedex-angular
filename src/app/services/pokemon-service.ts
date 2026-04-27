import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import type { Pokemon } from '../types/pokemon'

/**
 * Service for managing and retrieving Pokémon data from the API.
 *
 * @remarks
 * This service provides a reactive signal with the list of Pokémon, loaded from a static JSON API.
 * It is provided in the root injector, so it is a singleton throughout the app.
 *
 * @example
 * ```ts
 * // Inject the service in a component or another service
 * constructor(private pokemonService: PokemonService) {}
 *
 * // Access the list of Pokémon reactively
 * const pokemons = this.pokemonService.pokemonList();
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  /**
   * Angular HttpClient instance for making HTTP requests.
   *
   * @remarks
   * Used internally to fetch Pokémon data from the API endpoint.
   */
  private readonly http: HttpClient = inject(HttpClient)

  /**
   * The URL to the Pokémon API JSON file.
   *
   * @remarks
   * This is a static file located in the public directory of the app.
   * You can override this property in a subclass for testing or custom endpoints.
   */
  protected readonly apiUrl: string = '/pokemon-api.json'

  /**
   * Reactive signal containing the list of Pokémon loaded from the API.
   *
   * @remarks
   * This signal is updated automatically when the API responds.
   * The initial value is an empty array until the data is loaded.
   *
   * @readonly
   * @type {Signal<Pokemon[]>}
   *
   * @example
   * // Get the current list of Pokémon
   * const pokemons = this.pokemonList();
   */
  readonly pokemonList = toSignal(this.http.get<Pokemon[]>(this.apiUrl), {
    initialValue: [],
  })

  // /**
  //  * Loads Pokémon data from the API and updates the signal.
  //  *
  //  * @deprecated Use the reactive signal `pokemonList` instead.
  //  *
  //  * @returns {Promise<void>} Resolves when the data is loaded and set.
  //  * @throws {Error} If the fetch fails or the response is not OK.
  //  */
  // async loadPokemons(): Promise<void> {
  //   const res = await fetch(this.apiUrl);
  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch types: ${res.status} ${res.statusText}`);
  //   }
  //   const data: Pokemon[] = await res.json();
  //   this.pokemonList.set(data);
  // }
}
