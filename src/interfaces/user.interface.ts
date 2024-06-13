export type User = {
  id: string // email
  password: string
}
export type Token = {
  userId: string
  refreshToken?: string
}
