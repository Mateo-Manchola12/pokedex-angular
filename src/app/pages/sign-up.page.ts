import { Component, signal } from '@angular/core'
import { email, form, FormField, FormRoot, minLength, required, validate } from '@angular/forms/signals'

@Component({
  selector: 'app-sign-up',
  template: `
    <form [formRoot]="form" class="mx-auto mt-10 flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-8 shadow-lg">
      <h1 class="text-center text-2xl">Registrarse</h1>
      <div class="space-y-1.5">
        <label for="email" class="text-heading block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          [formField]="form.email"
          class="row-start-1 h-11 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 hover:bg-red-400/10 focus:border-red-300 focus:bg-red-500/10 focus:ring-2 focus:ring-red-400 focus:outline-none"
        />
        @if (form.email().dirty() && form.email().invalid()) {
          @for (error of form.email().errors(); track error) {
            <p class="text-sm text-red-500">{{ error.message }}</p>
          }
        }
      </div>
      <div class="space-y-1.5">
        <label for="password" class="text-heading block text-sm font-medium">Contraseña</label>
        <div class="relative">
          <input
            [type]="isVisible() ? 'text' : 'password'"
            id="password"
            [formField]="form.password"
            class="row-start-1 h-11 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 hover:bg-red-400/10 focus:border-red-300 focus:bg-red-500/10 focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <button
            type="button"
            (click)="onIsVisibleClick()"
            class="fill-primary absolute top-1/2 right-4 -translate-y-1/2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
              <path
                d="M607.5-372.5Q660-425 660-500t-52.5-127.5T480-680t-127.5 52.5T300-500t52.5 127.5T480-320t127.5-52.5m-204-51Q372-455 372-500t31.5-76.5T480-608t76.5 31.5T588-500t-31.5 76.5T480-392t-76.5-31.5M235.5-272Q125-344 61-462q-5-9-7.5-18.5T51-500t2.5-19.5T61-538q64-118 174.5-190T480-800t244.5 72T899-538q5 9 7.5 18.5T909-500t-2.5 19.5T899-462q-64 118-174.5 190T480-200t-244.5-72m452-67.5Q782-399 832-500q-50-101-144.5-160.5T480-720t-207.5 59.5T128-500q50 101 144.5 160.5T480-280t207.5-59.5"
              />
            </svg>
          </button>
        </div>
        @if (form.password().dirty() && form.password().invalid()) {
          @for (error of form.password().errors(); track error) {
            <p class="text-sm text-red-500">{{ error.message }}</p>
          }
        }
      </div>
      <div class="space-y-1.5">
        <label for="confirmPassword" class="text-heading block text-sm font-medium">Confirme la contraseña</label>
        <input
          [type]="isVisible() ? 'text' : 'password'"
          id="confirmPassword"
          [formField]="form.confirmPassword"
          class="row-start-1 h-11 w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 hover:bg-red-400/10 focus:border-red-300 focus:bg-red-500/10 focus:ring-2 focus:ring-red-400 focus:outline-none"
        />
        @if (form.confirmPassword().dirty() && form.confirmPassword().invalid()) {
          @for (error of form.confirmPassword().errors(); track error) {
            <p class="text-sm text-red-500">{{ error.message }}</p>
          }
        }
      </div>
      <button
        [disabled]="form().invalid() || form().submitting()"
        type="submit"
        class="bg-primary disabled:bg-primary/50 hover:bg-primary/90 focus:ring-primary rounded-xl py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
      >
        @if (form().submitting()) {
          <span>Registrando...</span>
        } @else {
          <span>Registrarse</span>
        }
      </button>
    </form>
  `,
  imports: [FormField, FormRoot],
})
export class SignUpPage {
  model = signal({
    email: '',
    password: '',
    confirmPassword: '',
  })

  isVisible = signal(true)

  form = form(
    this.model,
    (schemaPath) => {
      required(schemaPath.email, { message: 'El email es requerido' })
      email(schemaPath.email, { message: 'El email no es válido' })

      required(schemaPath.password, { message: 'La contraseña es requerida' })
      minLength(schemaPath.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' })

      required(schemaPath.confirmPassword, { message: 'La confirmación de contraseña es requerida' })

      validate(schemaPath.confirmPassword, (ctx) => {
        const confirmPassword = ctx.value()
        const password = ctx.valueOf(schemaPath.password)

        if (confirmPassword !== password) return { kind: 'mismatch', message: 'Las contraseñas no coinciden' }

        return null
      })
    },
    {
      submission: {
        action: async () => {
          console.info(this.model())
          await new Promise((resolve) => setTimeout(resolve, 10000))
        },
      },
    },
  )

  onIsVisibleClick() {
    this.isVisible.set(!this.isVisible())
  }
}
