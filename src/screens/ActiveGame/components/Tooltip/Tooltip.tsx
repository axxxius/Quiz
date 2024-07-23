import ReactDOM from 'react-dom'

import TooltilArrow from '@assets/icons/tooltipArrow.svg?react'
import { Typography } from '@shared'

import { memo } from 'react'
import styles from './Tooltip.module.css'

export const ToolTip = memo(
  ({
    question,
    isTooltipVisible,
    position
  }: {
    question: Question
    isTooltipVisible: boolean
    position: { top: number; left: number }
  }) => {
    const tooltipRoot = document.getElementById('tooltip-root') as Element | DocumentFragment

    return ReactDOM.createPortal(
      <div
        className={styles.hover_container}
        style={{
          opacity: isTooltipVisible ? 1 : undefined,
          visibility: isTooltipVisible ? 'visible' : undefined,
          top: position.top,
          left: position.left
        }}
      >
        <div className='rounded-sm bg-white p-2'>
          <Typography variant='text_12_m' className={styles.question_question}>
            {question.question_description}
          </Typography>
          <div className='flex justify-between gap-x-2'>
            <Typography variant='text_12_m' className={styles.question_etalon}>
              {question.question_correct_answer}
            </Typography>
            <Typography variant='text_12_m' className={styles.question_weight}>
              Баллы: {question.question_weight}
            </Typography>
          </div>
        </div>
        <TooltilArrow className={styles.tooltip_arrow} />
      </div>,
      tooltipRoot
    )
  }
)
