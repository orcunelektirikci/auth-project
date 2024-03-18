import type { StrKeyObj } from '~/types/objects'

export const sanitizeUrl = (url: string) => url.replace(/\/+/g, '/').replace(/\/+$/, '')
export const objHas = (object: StrKeyObj<any>, key: string) => Object.prototype.hasOwnProperty.call(object, key)
