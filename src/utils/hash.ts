import bcrypt from 'bcrypt'

export const hash = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const checkPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}
