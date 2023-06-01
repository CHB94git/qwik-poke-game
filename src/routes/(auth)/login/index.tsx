import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, { cookie, redirect }) => {
  const { email, password } = data
  const jwt = 'esto_es_un_jwt_de_prueba'

  if (email === 'chb@email.com' && password === '123456') {
    cookie.set('jwt', jwt, { secure: true, path: '/' });
    redirect(302, '/')
    return { success: true, jwt }
  }
  return { success: false }
}, zod$({
  email: z.string().email('Formato de email no válido'),
  password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres')
}))

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction()

  return (
    <Form action={ action } class="login-form mt-5">
      <div class="relative">
        <input
          name="email" type="text" placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          name="password" type="password" placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type='submit'>Ingresar</button>
      </div>

      <p>
        { action.value?.success && (
          <code>Autenticado: Token: { action.value.jwt }</code>
        ) }
      </p>


      <code>
        { JSON.stringify(action.value, undefined, 2) }
      </code>
    </Form>
  )
});