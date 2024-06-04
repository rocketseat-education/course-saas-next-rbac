'use server'

import { signInWithPassword } from '@/http/sign-in-with-password'

export async function signInWithEmailAndPassword(
  previousState: unknown,
  data: FormData,
) {
  console.log(previousState)

  const { email, password } = Object.fromEntries(data)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const result = await signInWithPassword({
    email: String(email),
    password: String(password),
  })

  console.log(result)

  return 'Sucesso!'
}
