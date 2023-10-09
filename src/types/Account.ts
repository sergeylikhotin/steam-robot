export interface Account {
  username: string
  password: string
  sharedSecret: string
  identitySecret?: string | null
  headers?: Record<string, string>
  proxy?: string | null
}
