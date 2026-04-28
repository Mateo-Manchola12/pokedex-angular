import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment.development'
import type { Pokemon } from '../types/pokemon'

interface GetPokemonsResponse {
  ok: boolean
  data: { data: Pokemon[] }
}

interface LoadRespondeError {
  ok: false
  error: string
}

interface LoadResponseSuccess<T> {
  ok: true
  data: T
}

type LoadResponse<T> = LoadRespondeError | LoadResponseSuccess<T>

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient)

  readonly APP_ROUTES = {
    GET_ALL: environment.API_URL + '/pokemon?limit=-1',
  }

  private _pokemons$ = signal<Pokemon[]>([])
  private _isLoading$ = signal(false)
  private _error$ = signal<string | null>(null)

  readonly pokemonsList = this._pokemons$.asReadonly()
  readonly isLoading = this._isLoading$.asReadonly()
  readonly error = this._error$.asReadonly()

  async load(): Promise<LoadResponse<Pokemon[]>> {
    this._isLoading$.set(true)
    this._error$.set(null)

    try {
      const res = await lastValueFrom(this.http.get<GetPokemonsResponse>(this.APP_ROUTES.GET_ALL))

      if (!res.ok) throw new Error('Error cargando pokemones')

      this._pokemons$.set(res.data.data)

      return { ok: true, data: res.data.data }
    } catch (error) {
      console.error(error)
      this._error$.set('Error cargando pokemones')
      return { ok: false, error: this._error$()! }
    } finally {
      this._isLoading$.set(false)
    }
  }
}
