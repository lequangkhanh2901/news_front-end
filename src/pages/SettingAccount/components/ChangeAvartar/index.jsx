import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'

import styles from './ChangeAvartar.module.scss'

const cx = classNames.bind(styles)

function ChangeAvartar({ onChange, file }) {
  const [avartar, setAvartar] = useState('')
  useEffect(() => {
    if (file) {
      setAvartar(URL.createObjectURL(file))
    }
    return () => {
      avartar && URL.revokeObjectURL(avartar)
    }
  }, [file])
  return (
    <div className={cx('wrapper')}>
      <div className={cx('choose-image')}>
        <label htmlFor='inp-file-chang-avartar'>Chọn ảnh</label>
        <input type='file' accept='image/*' id='inp-file-chang-avartar' onChange={onChange} />
      </div>
      <div className={cx('preview')}>
        <img src={avartar} alt='' className={cx('image-preview')} />
      </div>
    </div>
  )
}

export default ChangeAvartar
