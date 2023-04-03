import classNames from 'classnames/bind'
import PostItemSettingPage from '../PostItemSettingPage'

import styles from './PostSettingPage.module.scss'

const cx = classNames.bind(styles)

function PostSettingPage({ posts, onDelete, onRestore, page, type, onCensor }) {
  return (
    <div className={cx('posts')}>
      <table className={cx('posts-table')}>
        <thead className={cx('head-table')}>
          <tr>
            <th className={cx('post-id')}>id</th>
            <th className={cx('post-title')}>Tiêu đề</th>
            <th className={cx('post-created')}>Ngày đăng</th>
            <th className={cx('post-author')}>Tác giả</th>
            <th className={cx('post-censor')}>Người duyệt</th>
            <th className={cx('post-censored')}>Ngày duyệt</th>
            <th className={cx('post-action')}></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            if (type === 'CENSORED') {
              if (post.id_censor == null) {
                return null
              }
            }
            if (type === 'UN_CENSORED') {
              if (post.id_censor) {
                return null
              }
            }
            return (
              <PostItemSettingPage
                key={post.id}
                post={post}
                onDelete={onDelete}
                onRestore={onRestore}
                onCensor={onCensor}
                page={page}
                type={type}
              />
              //   <tr className={cx('post')} key={post.id}>
              //     <td>{post.id}</td>
              //     <td>{post.title}</td>
              //     <td>{getTimeString(post.created_at)}</td>
              //     <td>
              //       <Link to={'/user/' + post.id_author}>{post.name_author}</Link>
              //     </td>
              //     <td>
              //       <Link to={'/user/' + post.id_censor}>{post.name_censor}</Link>
              //     </td>
              //     <td>{getTimeString(post.censored_at)}</td>
              //     <td>
              //       <Button onClick={() => onDelete(post.id)} size='small' danger>
              //         <FontAwesomeIcon icon={faTrash} />
              //       </Button>
              //     </td>
              //   </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PostSettingPage
