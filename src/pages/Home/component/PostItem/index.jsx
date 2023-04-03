import { faClock, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { generatePath, Link } from 'react-router-dom'

import Image from '../../../../components/Image'
import routers from '../../../../configs/baseRoutes'
import { generatePathSlug, getTimeString } from '../../../../optionalFunction'

import styles from './PostItem.module.scss'

const cx = classNames.bind(styles)

function PostItem({ post }) {
  let time = ''
  if (post.updated_at) {
    time = getTimeString(post.updated_at)
  } else {
    time = getTimeString(post.created_at)
  }
  return (
    <div className={cx('post')} key={post.id}>
      <Link
        className={cx('image-post')}
        to={generatePath(routers.post, {
          id: post.id,
          slug: generatePathSlug(post.title),
        })}
      >
        <Image alt={post.title} src={post.avartar_cdn} />
      </Link>
      <div className={cx('info')}>
        <Link
          to={generatePath(routers.post, {
            id: post.id,
            slug: generatePathSlug(post.title),
          })}
          className={cx('link-post-title')}
        >
          <h2 className={cx('post-title')}>{post.title}</h2>
        </Link>
        <p className={cx('sort-desc')}>{post.sort_description}</p>
        <div className={cx('about')}>
          <div className={cx('viewes')}>
            <FontAwesomeIcon icon={faEye} />
            {post.viewed}
          </div>
          <div className={cx('time')}>
            <FontAwesomeIcon icon={faClock} />
            {time}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
