'use server'

import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInURL.searchParams.set('client_id', 'YOUR_CLIENT_ID')
  githubSignInURL.searchParams.set('redirect_uri', 'YOUR_REDIRECT_URI')
  githubSignInURL.searchParams.set('scope', 'user')

  redirect(githubSignInURL.toString())
}
