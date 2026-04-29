import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
/**
 * Root component for the Pokédex Angular application.
 *
 * @remarks
 * This component manages the main layout, search, filtering, and selection logic for Pokémon and types.
 */
@Component({
  selector: 'app-root',
  template: `
    <header class="flex h-20 items-center justify-center bg-linear-90 from-[#2e418e] to-[#da3b41] text-white">
      <h1 class="text-2xl font-bold">Pokédex</h1>
    </header>
    <main class="min-h-[calc(100dvh-5rem)] px-8 py-4">
      <router-outlet></router-outlet>
    </main>
  `,
  imports: [RouterOutlet],
})
export class App {}
