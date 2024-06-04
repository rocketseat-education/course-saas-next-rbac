'use server'

export async function signInWithEmailAndPassword(data: FormData) {
  console.log(Object.fromEntries(data))
}
