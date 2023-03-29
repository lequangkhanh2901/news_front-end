import classNames from 'classnames/bind'
import { useState } from 'react'

import Button from '../../../../components/Button'
import styles from './AddComment.module.scss'

const cx = classNames.bind(styles)

function AddComment({ onAddComment }) {
  const [comment, setComment] = useState('')

  const handleChangeComment = (e) => {
    if (e.target.value.startsWith(' ')) {
      return
    }
    setComment(e.target.value)
  }
  return (
    <div className={cx('wrapper')}>
      <input
        className={cx('input-comment')}
        spellCheck={false}
        value={comment}
        onChange={handleChangeComment}
      />
      <Button
        size='large-medium'
        onClick={() => {
          setComment('')
          onAddComment(comment)
        }}
      >
        Bình luận
      </Button>
    </div>
  )
}

export default AddComment
