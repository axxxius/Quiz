import { useRef, useState } from 'react'

import { ToolTip } from '@screens/ActiveGame/components'

import styles from './QuestionNumber.module.css'

export const QuestionNumber = ({ question }: { question: Question }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const questionRef = useRef<HTMLDivElement>(null)

  const tooltipPosition = {
    top: !isTooltipVisible || !questionRef.current ? -160 : -160,
    left: questionRef.current
      ? questionRef.current.getBoundingClientRect().left + window.scrollX
      : -500
  }

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
