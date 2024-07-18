import { api } from './api-client'

export async function acceptInvite(inviteId: string) {
  await api.post(`invites/${inviteId}/accept`)
}
