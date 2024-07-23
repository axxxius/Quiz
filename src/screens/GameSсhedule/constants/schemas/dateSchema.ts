import { minDate, required } from '@screens/GameSсhedule/constants'

export const dateSchema = {
  min: minDate(),
  required: required
}
