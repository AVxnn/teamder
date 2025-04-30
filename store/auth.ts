import { proxy } from 'valtio'

export const authState = proxy({
  user: null as null | { name: string; email: string; image: string },
})