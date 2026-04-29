import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../environments/environment.development'
import type { PokemonType } from '../types/pokemon-type'

interface GetTypesResponse {
  ok: boolean
  data: PokemonType[]
}

/*
Forma facil de hacerlo:
interface LoadResponse<T> {
  ok: boolean
  data: T
  error?: string
} */

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
export class TypesService {
  private http = inject(HttpClient)

  readonly APP_ROUTES = {
    GET_ALL: environment.API_URL + '/types',
  }

  private _types$ = signal<PokemonType[]>([])
  private _isLoading$ = signal(false)
  private _error$ = signal<string | null>(null)

  readonly typesList = this._types$.asReadonly()
  readonly isLoading = this._isLoading$.asReadonly()
  readonly error = this._error$.asReadonly()

  /**
   * 1. Fetch all
   * 2. Obtener los datos de la respuesta
   * 3. Guardar los datos en memoria
   * 4. Devolver los datos a quien lo solicite
   *
   * -> Gestionar error y loading
   */
  async load(): Promise<LoadResponse<PokemonType[]>> {
    this._isLoading$.set(true)
    this._error$.set(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      const res = await lastValueFrom(this.http.get<GetTypesResponse>(this.APP_ROUTES.GET_ALL))

      if (!res.ok) throw new Error('Ha ocurrido un error al cargar los datos')

      this._types$.set(res.data)

      return { ok: true, data: res.data }
    } catch (error) {
      console.error('[TYPES]:', error)
      this._error$.set('Ha ocurrido un error al cargar los datos')
      return { ok: false, error: this._error$()! }
    } finally {
      this._isLoading$.set(false)
    }
  }
}
