import { Role } from '@saas/auth'

import { api } from './api-client'

interface CreateInviteRequest {
  org: string
  email: string
  role: Role
}

type CreateInviteResponse = void

export async function createInvite({
  org,
  email,
  role,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
  await api.post(`organizations/${org}/invites`, {
    json: {
      email,
      role,
    },
  })
}
