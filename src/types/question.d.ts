interface Question {
  readonly id: number
  name: string //число типо 1.1
  description: string //сам вопрос
  correctAnswer: string //эталон
  weight: number //количество баллов за вопрос
}
