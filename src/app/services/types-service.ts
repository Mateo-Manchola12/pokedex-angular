import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import type { PokemonType } from '../types/pokemon-type'

/**
 * Service for managing and retrieving Pokémon types from the API.
 *
 * @remarks
 * This service provides a reactive signal with the list of Pokémon types, loaded from a static JSON API.
 * It is provided in the root injector, so it is a singleton throughout the app.
 */
@Injectable({
  providedIn: 'root',
})
export class TypesService {
  /**
   * The URL to the Pokémon types API JSON file.
   * @internal
   */
  protected readonly apiUrl = '/pokemon-types-api.json'

  /**
   * Angular HttpClient instance for making HTTP requests.
   * @internal
   */
  protected http = inject(HttpClient)

  // typesList = signal<PokemonType[]>([]);

  /**
   * Reactive signal containing the list of Pokémon types loaded from the API.
   *
   * @example
   * this.typesService.typesList(); // returns PokemonType[]
   */
  typesList = toSignal(this.http.get<PokemonType[]>(this.apiUrl), {
    initialValue: [],
  })

  // /**
  //  * Loads Pokémon types data from the API and updates the signal.
  //  *
  //  * @deprecated Use the reactive signal `typesList` instead.
  //  */
  // public async loadTypes() {
  //   const res = await fetch(this.apiUrl);
  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch types: ${res.status} ${res.statusText}`);
  //   }
  //   const data: PokemonType[] = await res.json();
  //   this.typesList.set(data);
  // }

  /**
   * Returns a computed signal for a Pokémon type by its ID.
   *
   * @param id - The ID of the Pokémon type to retrieve.
   * @returns A computed signal with the found Pokémon type or undefined.
   */
  getById(id: number) {
    return computed(() => this.typesList().find((type) => type.id === id))
  }
}
