import styles from './ChangeName.module.scss'

function ChangeName({ onChange, value }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Đổi tên</h1>
      <input
        type='text'
        minLength='3'
        maxLength='30'
        onChange={onChange}
        value={value}
        placeholder='Tên tài khoản'
      />
    </div>
  )
}

export default ChangeName
