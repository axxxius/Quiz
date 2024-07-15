import { Input } from "@shared"
import { Textarea } from "@screens/Teams/components/Textarea/Textarea"
import styles from '@screens/Teams/components/TeamForm/TeamForm.module.css'


export const TeamForm = () => {
    return (
        <form className={styles.form} action="" >
            <Input className={styles.input} label='Название' />
            <Textarea />
        </form>
    )
}