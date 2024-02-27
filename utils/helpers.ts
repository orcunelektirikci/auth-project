import type { HasId } from '~/types/store/defaults'

export const sanitizeUrl = (url: string) => url.replace(/\/+/g, '/').replace(/\/+$/, '')

export function normalizeResource(resource: Array<HasId> | HasId) {
  const normalized: Record<number, HasId> = {}

  if (Array.isArray(resource)) {
    resource.forEach((r) => {
      normalized[r.id as number] = r
    })
  }
  else {
    normalized[resource.id as number] = resource
  }

  return normalized
}
