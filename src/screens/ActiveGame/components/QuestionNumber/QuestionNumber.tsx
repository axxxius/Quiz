import { useMemo, useRef, useState } from 'react'
import ToolTip from '../Tooltip/Tooltip'
import styles from './QuestionNumber.module.css'

export interface Question {
  id: number
  name: string
  question: string
  etalon?: string | boolean
  weight: number //количество баллов за вопрос
}

const QuestionNumber = ({ question }: { question: Question }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const questionRef = useRef<HTMLDivElement>(null)

  const tooltipPosition = useMemo(() => {
    if (!isTooltipVisible || !questionRef.current) {
      return { top: -100, left: -500 }
    }
    const rect = questionRef.current.getBoundingClientRect()
    return {
      top: -rect.top * 1.82 - window.scrollY * 1.82,
      left: rect.left + window.scrollX
    }
  }, [isTooltipVisible, questionRef.current])

  return (
    <div className={styles.question_container}>
      <div
        ref={questionRef}
        className={styles.question_name}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {question.name}
      </div>
      <ToolTip question={question} isTooltipVisible={isTooltipVisible} position={tooltipPosition} />
    </div>
  )
}

export default QuestionNumber
