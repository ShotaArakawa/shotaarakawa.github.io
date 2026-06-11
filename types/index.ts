export interface Project {
  slug: string
  title: string
  color: 'cyan' | 'green' | 'amber'
  icon: string
  thumbLabel: string
  description: string
  tags: string[]
  siteUrl?: string | null
  githubUrl?: string | null
  wip?: boolean
}
