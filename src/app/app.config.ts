import { provideHttpClient } from '@angular/common/http'
import type { ApplicationConfig } from '@angular/core'
import { provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'

/**
 * Main application configuration object for Angular providers.
 *
 * @remarks
 * This configuration sets up global error listeners, routing, and HTTP client with fetch support.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes), provideHttpClient()],
}
