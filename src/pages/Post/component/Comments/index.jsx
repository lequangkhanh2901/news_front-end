import classNames from 'classnames/bind'
import { memo } from 'react'

import styles from './Comments.module.scss'
import CommentItem from '../CommentItem'

const cx = classNames.bind(styles)

function Comments({ data, onReply, onLikeComment, onReport, onDelete }) {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>Bình luận</h3>
      {data.map((item) => (
        <CommentItem
          key={item.comment.id}
          comment={item}
          onReply={onReply}
          onLikeComment={onLikeComment}
          onReport={onReport}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default memo(Comments)
