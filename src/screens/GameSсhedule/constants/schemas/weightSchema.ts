import { minValue, required } from '../rules'

export const weightSchema = {
  required: required,
  min: minValue(0)
}
