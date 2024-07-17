import { maxLength, minLength, required } from './../rules'

export const nameSchema = {
  required: required('название'),
  minLength: minLength(1, 'названия команды'),
  maxLength: maxLength(100, 'названия команды')
}
