export const sanitizeUrl = (url: string) => url.replace(/\/+/g, '/').replace(/\/+$/, '')
