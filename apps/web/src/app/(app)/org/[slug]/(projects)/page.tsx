import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export default async function Projects() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`/org/${currentOrg}/create-project`}>
              <Plus className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          You are not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
