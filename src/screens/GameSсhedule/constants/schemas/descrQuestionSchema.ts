import { maxLength, required } from '../rules'

export const descrQuestionSchema = {
  required: required,
  maxLength: maxLength(100)
}
