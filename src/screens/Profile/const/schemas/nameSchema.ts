import { maxLength, minLength } from '../rules'

export const nameSchema = {
  minLength: minLength(2),
  maxLength: maxLength(15)
}
