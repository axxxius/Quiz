import { maxLength, minLength, required } from './../rules'

export const nameSchema = {
  required,
  minLength: minLength(1),
  maxLength: maxLength(100)
}
