import styles from '@screens/Teams/components/Textarea/Textarea.module.css'

interface TextareaProps {
    label: string;
}

export const Textarea = ({ label }: TextareaProps) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <textarea className={styles.textarea} rows={5}/>
        </div>
    )
}