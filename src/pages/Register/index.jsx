import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Register.module.scss'
import axiosCt from '../../configs/axiosCT'

function Register() {
  const [code, setCode] = useState()
  const { token } = useParams()
  useEffect(() => {
    const register = async () => {
      const response = await axiosCt.post('/user/register', {
        token,
      })
      if (response != 'fail') {
        setCode(response.code)
      }
    }
    register()
  }, [])
  return (
    <div className={styles.wrapper}>
      {(() => {
        switch (code) {
          case 201:
            return (
              <div className={styles.success}>Tạo tài khoản thành công!</div>
            )
          case 300:
            return <div className={styles.error}>Tài khoản đã tồn tại!</div>
          default:
            return (
              <div className={styles.error}>Lỗi hệ thống. Thử lại sau!</div>
            )
        }
      })()}
    </div>
  )
}

export default Register
