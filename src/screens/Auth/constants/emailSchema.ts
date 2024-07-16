import { maxLength, patterEmail, required } from './rules'

export const emailSchema = {
  required,
  maxLength: maxLength(30),
  pattern: patterEmail
}
