import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@saas/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from '@/http/error-handler'
import { authenticateWithGithub } from '@/http/routes/auth/authenticate-with-github'
import { authenticateWithPassword } from '@/http/routes/auth/authenticate-with-password'
import { getProfile } from '@/http/routes/auth/get-profile'
import { requestPasswordRecover } from '@/http/routes/auth/request-password-recover'
import { resetPassword } from '@/http/routes/auth/reset-password'
import { getOrganizationBilling } from '@/http/routes/billing/get-organization-billing'
import { acceptInvite } from '@/http/routes/invites/accept-invite'
import { createInvite } from '@/http/routes/invites/create-invite'
import { getInvite } from '@/http/routes/invites/get-invite'
import { getPendingInvites } from '@/http/routes/invites/get-pending-invites'
import { rejectInvite } from '@/http/routes/invites/reject-invite'
import { revokeInvite } from '@/http/routes/invites/revoke-invite'
import { getMembers } from '@/http/routes/members/get-members'
import { removeMember } from '@/http/routes/members/remove-member'
import { updateMember } from '@/http/routes/members/update-member'
import { createOrganization } from '@/http/routes/orgs/create-organization'
import { getMembership } from '@/http/routes/orgs/get-membership'
import { getOrganization } from '@/http/routes/orgs/get-organization'
import { getOrganizations } from '@/http/routes/orgs/get-organizations'
import { shutdownOrganization } from '@/http/routes/orgs/shutdown-organization'
import { transferOrganization } from '@/http/routes/orgs/transfer-organization'
import { updateOrganization } from '@/http/routes/orgs/update-organization'
import { createProject } from '@/http/routes/projects/create-project'
import { deleteProject } from '@/http/routes/projects/delete-project'
import { getProject } from '@/http/routes/projects/get-project'
import { getProjects } from '@/http/routes/projects/get-projects'
import { updateProject } from '@/http/routes/projects/update-project'

import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)
app.register(updateProject)

app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

app.register(createInvite)
app.register(getInvite)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(getPendingInvites)

app.register(getOrganizationBilling)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running!')
})
