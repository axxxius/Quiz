import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.loader_container}>
      {/* <div className='text-8xl leading-tight font-vela-bold text-white'>Loading</div> */}
      <div className={styles.loader} />
    </div>
  )
}
