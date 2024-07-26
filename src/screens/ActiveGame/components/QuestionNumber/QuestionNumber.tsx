import { useRef, useState } from 'react'

import { ToolTip } from '@screens/ActiveGame/components'

import styles from './QuestionNumber.module.css'

export const QuestionNumber = ({ question }: { question: Question }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const questionRef = useRef<HTMLDivElement>(null)

  const tooltipPosition = {
    top:
      isTooltipVisible && questionRef.current
        ? -questionRef.current.getBoundingClientRect().top * 0.52 - window.scrollY * 0.52
        : -1000,
    left:
      questionRef.current && isTooltipVisible
        ? questionRef.current.getBoundingClientRect().left + window.scrollX
        : -1000
  } //в случае если tooltip не виден, он уходит в лево, где его нельзя проскроллить и увидеть

  return (
    <div className={styles.question_container}>
      <div
        ref={questionRef}
        className={styles.question_name}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {question.question_name}
      </div>
      <ToolTip question={question} isTooltipVisible={isTooltipVisible} position={tooltipPosition} />
    </div>
  )
}
