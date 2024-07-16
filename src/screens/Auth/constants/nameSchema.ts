import { maxLength, minLength, patterName, required } from './rules'

export const nameSchema = {
  required,
  minLength: minLength(2),
  maxLength: maxLength(15),
  pattern: patterName
}
