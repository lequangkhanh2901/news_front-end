import classNames from 'classnames/bind'
import PostItem from '../PostItem'

import styles from './BlockCategory.module.scss'

const cx = classNames.bind(styles)

function BlockCategory({ data, categoryName }) {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('category-name')}>{categoryName}</h2>
      <div className={cx('posts')}>
        {data.map((post) => (
          <PostItem post={post} key={post.id} />
          //   <div className={cx('post')} key={post.id}>
          //     <Link
          //       className={cx('image-post')}
          //       to={generatePath(routers.post, {
          //         id: post.id,
          //         slug: generatePathSlug(post.title),
          //       })}
          //     >
          //       <Image alt={post.title} src={post.avartar_cdn} />
          //     </Link>
          //     <div className={cx('info')}>
          //       <Link
          //         to={generatePath(routers.post, {
          //           id: post.id,
          //           slug: generatePathSlug(post.title),
          //         })}
          //         className={cx('link-post-title')}
          //       >
          //         <h2 className={cx('post-title')}>{post.title}</h2>
          //       </Link>
          //       <p className={cx('sort-desc')}>{post.sort_description}</p>
          //       <div className={cx('about')}></div>
          //     </div>
          //   </div>
        ))}
      </div>
    </div>
  )
}

export default BlockCategory
