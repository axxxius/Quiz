import { useEffect, useRef, useState } from 'react'
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
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const questionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (questionRef.current) {
      const rect = questionRef.current.getBoundingClientRect()
      // console.log(rect.top, rect.left)
      setTooltipPosition({
        top: -rect.top * 1.82 - window.scrollY,
        left: rect.left + window.scrollX
      })
    }
  }, [isTooltipVisible])

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
