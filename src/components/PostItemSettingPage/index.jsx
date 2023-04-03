import {
  faCheck,
  faPen,
  faTrash,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { generatePath, Link } from 'react-router-dom'
import routers from '../../configs/baseRoutes'
import { getTimeString } from '../../optionalFunction'
import Button from '../Button'

import styles from './PostItemSettingPage.module.scss'

const cx = classNames.bind(styles)

function PostItemSettingPage({
  post,
  onDelete,
  onRestore,
  page,
  type,
  onCensor,
}) {
  const user = useSelector((state) => state.user)
  return (
    <tr className={cx('post')} key={post.id}>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{getTimeString(post.created_at)}</td>
      <td>
        {user.role === 0 ? (
          <Link to={generatePath(routers.user, { id: post.id_author })}>
            {post.name_author}
          </Link>
        ) : (
          post.name_author
        )}
      </td>
      <td>
        {user.role === 0
          ? post.id_censor && (
              <Link to={generatePath(routers.user, { id: post.id_censor })}>
                {post.name_censor}
              </Link>
            )
          : post.name_censor}
      </td>
      <td>{post.censored_at ? getTimeString(post.censored_at) : null}</td>
      <td>
        {(function () {
          if (page === 'MANAGER') {
            if (type === 'CENSORED') {
              return null
            } else if (type === 'UN_CENSORED') {
              return (
                <div className={cx('action')}>
                  <Button
                    size='small'
                    to={generatePath(routers.editPost, { id: post.id })}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                  <Button onClick={() => onDelete(post.id)} size='small' danger>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              )
            } else {
              if (user.role === 2) {
                return (
                  <Button green size='small' onClick={() => onCensor(post.id)}>
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                )
              } else {
                return (
                  <Button onClick={() => onDelete(post.id)} size='small' danger>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                )
              }
            }
          } else {
            return (
              <div className={cx('action')}>
                <Button onClick={() => onRestore(post.id)} size='small'>
                  <FontAwesomeIcon icon={faTrashArrowUp} />
                </Button>
                <Button onClick={() => onDelete(post.id)} size='small' danger>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            )
          }
        })()}
        {/* {page === 'MANAGER' ? (
          (type === 'UN_CENSORED' && (
            <Button onClick={() => onDelete(post.id)} size='small' danger>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          ),
          type === 'CENSORED' && null,
          type === undefined && (
            <Button onClick={() => onDelete(post.id)} size='small' danger>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          ))
        ) : (
          <div className={cx('action')}>
            <Button onClick={() => onRestore(post.id)} size='small'>
              <FontAwesomeIcon icon={faTrashArrowUp} />
            </Button>
            <Button onClick={() => onDelete(post.id)} size='small' danger>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        )} */}
      </td>
    </tr>
  )
}

export default PostItemSettingPage
