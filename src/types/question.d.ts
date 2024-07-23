interface Question {
  readonly id: number
  question_name: string //число типо 1.1
  question_description: string //сам вопрос
  question_correct_answer: string //эталон
  question_weight: number //количество баллов за вопрос
}
