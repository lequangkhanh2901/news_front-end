import {
  faCommentAlt,
  faPlane,
  faThumbsUp,
  faWarning,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../../../components/Button'

import { getTimeString } from '../../../../optionalFunction'
import styles from './CommentItem.module.scss'

confirm
const cx = classNames.bind(styles)

function CommentItem({ comment, onReply, onLikeComment }) {
  const [isRepFormShow, setIsRepFormShow] = useState(false)
  const [reply, setReply] = useState('')
  const user = useSelector((state) => state.user)

  const handleReplyChange = (e) => {
    if (e.target.value.startsWith(' ')) {
      return
    }
    setReply(e.target.value)
  }

  return (
    <div className={cx('comment')}>
      <div className={cx('content')}>
        <span className={cx('user-name')}>{comment.comment.user_name}</span>
        {comment.comment.content}
      </div>
      <div className={cx('info')}>
        <span className={cx('time')}>
          {comment.comment.updated_at
            ? getTimeString(comment.comment.updated_at)
            : getTimeString(comment.comment.created_at)}
        </span>
      </div>
      <div className={cx('action')}>
        <div className={cx('like-comment')}>
          <Button
            size='small'
            fade={comment.comment.isLikeByUser ? false : true}
            onClick={() => onLikeComment(comment.comment.id, 'PARENT')}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </Button>
          <span>{comment.comment.numlike}</span>
          <Button warring size='small'>
            <FontAwesomeIcon icon={faWarning} />
          </Button>
          <div className={cx('reply')}>
            {isRepFormShow ? (
              <div className={cx('rep-form')}>
                <input
                  type='text'
                  value={reply}
                  className={cx('input-rep')}
                  onChange={handleReplyChange}
                />
                <Button
                  size='small-medium'
                  onClick={() => {
                    setReply('')
                    onReply({ reply, idComment: comment.comment.id })
                  }}
                >
                  <FontAwesomeIcon icon={faCommentAlt} />
                </Button>
                <Button
                  size='small-medium'
                  warring
                  onClick={() => setIsRepFormShow(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </div>
            ) : (
              <span
                className={cx('rep-btn')}
                onClick={() => {
                  if (!user.id) {
                    return
                  }
                  setIsRepFormShow(true)
                }}
              >
                Trả lời
              </span>
            )}
          </div>
        </div>
      </div>
      {comment.childComment.length > 0 ? (
        <div className={cx('child-comments')}>
          {comment.childComment.map((item) => (
            <div key={item.id} className={cx('child')}>
              <div className={cx('content')}>
                <span className={cx('user-name')}>{item.user_name}</span>
                {item.content}
              </div>
              <div className={cx('info')}>
                <span className={cx('time')}>
                  {item.updated_at
                    ? getTimeString(item.updated_at)
                    : getTimeString(item.created_at)}
                </span>
              </div>
              <div className={cx('action')}>
                <div className={cx('like-comment')}>
                  <Button
                    size='small'
                    fade={item.isLikeByUser ? false : true}
                    onClick={() => onLikeComment(item.id, 'CHILD')}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </Button>
                  <span>{item.numlike}</span>
                  <Button warring size='small'>
                    <FontAwesomeIcon icon={faWarning} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default CommentItem
