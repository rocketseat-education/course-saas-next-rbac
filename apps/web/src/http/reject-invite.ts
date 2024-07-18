import { api } from './api-client'

export async function rejectInvite(inviteId: string) {
  await api.post(`invites/${inviteId}/reject`)
}
