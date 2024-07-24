import { maxLength, minLength } from './../rules'

export const editNameSchema = {
  minLength: minLength(1),
  maxLength: maxLength(100)
}
