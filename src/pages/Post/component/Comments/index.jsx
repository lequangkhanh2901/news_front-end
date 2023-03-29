import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { memo, useEffect, useState } from 'react'
import axiosCt from '../../../../configs/axiosCT'
import Button from '../../../../components/Button'
import { getTimeString } from '../../../../optionalFunction'

import styles from './Comments.module.scss'
import CommentItem from '../CommentItem'

const cx = classNames.bind(styles)

function Comments({ data, onReply, onLikeComment }) {
  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('title')}>Bình luận</h3>
      {data.map((item) => (
        <CommentItem
          key={item.comment.id}
          comment={item}
          onReply={onReply}
          onLikeComment={onLikeComment}
        />
      ))}
    </div>
  )
}

export default memo(Comments)
