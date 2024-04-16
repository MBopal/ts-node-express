import bcrypt from 'bcrypt'

export const hash = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}
