import { rules } from '@screens/Auth/constants'

const emailSchema = {
  required: rules.required,
  maxLength: rules.maxLength(30),
  pattern: rules.patterEmail
}

const genderSchema = {
  required: rules.required
}

const nameSchema = {
  required: rules.required,
  minLength: rules.minLength(2),
  maxLength: rules.maxLength(15)
}

const passwordSchema = {
  required: rules.required,
  minLength: rules.minLength(2),
  maxLength: rules.maxLength(15)
}

const roleSchema = {
  required: rules.required
}

export const schema = {
  emailSchema,
  genderSchema,
  nameSchema,
  passwordSchema,
  roleSchema
}
