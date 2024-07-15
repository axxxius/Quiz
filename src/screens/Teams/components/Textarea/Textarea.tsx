import styles from '@screens/Teams/components/Textarea/Textarea.module.css'

export const Textarea = () => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>Описание</label>
            <textarea className={styles.textarea} rows={5}/>
        </div>
    )
}