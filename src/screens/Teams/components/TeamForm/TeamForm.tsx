import styles from '@screens/Teams/components/TeamForm/TeamForm.module.css'
import { Textarea } from "@screens/Teams/components/Textarea/Textarea"
import { Input } from "@shared"


export const TeamForm = () => {
    return (
        <form className={styles.form} action="" >
            <Input className={styles.input} label='Название' />
            <Textarea />
        </form>
    )
}