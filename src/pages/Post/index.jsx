import {
  faArrowUpFromBracket,
  faEye,
  faGreaterThan,
  faRotate,
  faThumbsUp,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { generatePath, Link, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import Aside from '../../components/Aside'
import axiosCt from '../../configs/axiosCT'
import routers from '../../configs/baseRoutes'
import { generatePathSlug, getTimeString } from '../../optionalFunction'
import Button from '../../components/Button'
import styles from './Post.module.scss'
import AddComment from './component/AddComment'
import Comments from './component/Comments'
import { initState, reducer } from './reducerPost'
import Modal from '../../components/Modal'

const cx = classNames.bind(styles)

function Post() {
  const { id } = useParams()
  const [rerender, setRerender] = useState([])
  const [state, dispatch] = useReducer(reducer, initState)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    const controller = new AbortController()

    dispatch({
      type: 'UPDATE_POST',
      payload: {},
    })
    const fetchPost = async () => {
      const response = await axiosCt.get('/post/' + id)
      if (response !== 'fail' && response.code === 200) {
        dispatch({
          type: 'UPDATE_POST',
          payload: response.data,
        })
      } else {
        dispatch({
          type: 'UPDATE_POST',
          payload: {},
        })
      }
    }
    fetchPost()
    return () => {
      controller.abort()
    }
  }, [id])

  useEffect(() => {
    const controller = new AbortController()
    const fetchComments = async () => {
      const response = await axiosCt.get('/comment/of-post/' + id)
      if (response !== 'fail' && response.code === 200) {
        const tmpArr = []
        response.data.forEach((item) => {
          if (!item.id_parent_comment) {
            tmpArr.push({ comment: item, childComment: [] })
          }
        })
        tmpArr.forEach((item) => {
          let resLen = response.data.length
          for (let i = resLen - 1; i >= 0; i--) {
            if (response.data[i].id_parent_comment === item.comment.id) {
              item.childComment.push(response.data[i])
            }
          }
        })
        dispatch({
          type: 'UPDATE_COMMENTS',
          payload: [...tmpArr],
        })
      }
    }

    fetchComments()

    return () => {
      controller.abort()
    }
  }, [rerender, id])

  const handleReply = useCallback(async (rep) => {
    const { reply, idComment } = rep
    const response = await axiosCt.post('/comment', {
      idPost: id,
      comment: reply,
      idParentComment: idComment,
    })
    if (response !== 'fail' && response.code === 201) {
      setRerender([])
    }
  }, [])

  const createdDate = getTimeString(state.post.created_at)
  let updatedTime
  state.post.updated_at && (updatedTime = getTimeString(state.post.updated_at))

  const handleAddComment = async (comment) => {
    if (!user.id) {
      toast.warning('Bạn cần đăng nhập!')
      return
    }
    if (comment.trim() === '') {
      toast.warning('Bạn cần nhập nọi dung!')
      return
    }
    const response = await axiosCt.post('/comment', {
      idPost: id,
      comment: comment,
    })
    if (response !== 'fail' && response.code === 201) {
      setRerender([])
    }
  }

  const handleLikePost = async () => {
    if (!user.id) {
      toast.warning('Bạn cần đăng nhập!')
      return
    }
    const response = await axiosCt.post('/post/like', { id })
    if (response !== 'fail') {
      if (response.code === 201) {
        dispatch({
          type: 'UPDATE_POST',
          payload: {
            ...state.post,
            isLikeByUser: true,
            num_like: state.post.num_like + 1,
          },
        })
      } else if (response.code === 202) {
        dispatch({
          type: 'UPDATE_POST',
          payload: {
            ...state.post,
            isLikeByUser: false,
            num_like: state.post.num_like - 1,
          },
        })
      }
    }
  }
  const handleLikeComment = useCallback(
    async (idComment, type) => {
      if (!user.id) {
        toast.warning('Bạn cần đăng nhập!')
        return
      }
      const response = await axiosCt.post('/comment/like', { id: idComment })
      if (response !== 'fail') {
        if (type === 'PARENT') {
          for (let item of state.comments) {
            if (item.comment.id === idComment) {
              if (response.code === 201) {
                item.comment.isLikeByUser = 1
                item.comment.numlike += 1
              } else if (response.code === 200) {
                item.comment.isLikeByUser = 0
                item.comment.numlike -= 1
              }
              break
            }
          }

          dispatch({
            type: 'UPDATE_COMMENTS',
            payload: state.comments,
          })
        } else if (type === 'CHILD') {
          let isBreak = false
          for (let item of state.comments) {
            for (let child of item.childComment) {
              if (child.id === idComment) {
                if (response.code === 201) {
                  child.isLikeByUser = 1
                  child.numlike += 1
                } else if (response.code === 200) {
                  child.isLikeByUser = 0
                  child.numlike -= 1
                }
                isBreak = true
                break
              }
            }
            if (isBreak) {
              break
            }
          }

          dispatch({
            type: 'UPDATE_COMMENTS',
            payload: state.comments,
          })
        }
      }
    },
    [state]
  )

  const handleReportPost = () => {
    if (!user.id) {
      toast.warning('Bạn cần đăng nhập')
      return
    }
    dispatch({
      type: 'UPDATE_MODAL_ACTION',
      payload: 'REPORT_POST',
    })
  }

  const renderModalContent = () => {
    switch (state.modalAction) {
      case 'REPORT_POST':
        return (
          <>
            <p className={cx('modal-trick')}>
              Lý do báo cáo<span>(20-100 ký tự)</span>:{' '}
            </p>
            <input
              className={cx('imput-reason')}
              spellCheck={false}
              value={state.reason}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_REASON',
                  payload: e.target.value,
                })
              }
            />
          </>
        )

      default:
        return null
    }
  }

  const handleCancelModal = () => {
    dispatch({
      type: 'UPDATE_MODAL_ACTION',
      payload: '',
    })
  }

  const handleOkModal = async () => {
    if (state.reason.trim() === '') {
      toast.warning('Lý do trống!')
      return
    }
    if (state.reason.length < 20) {
      toast.warning('Lý do quá ngắn!')
      return
    }
    switch (state.modalAction) {
      case 'REPORT_POST':
        const response = await axiosCt.post('/report/post', {
          id,
          reason: state.reason,
        })
        if (response !== 'fail') {
          if (response.code === 200) {
            toast.warning('Bạn từng báo cáo bài đăng này!')
          } else if (response.code === 201) {
            toast.success('Bạn đã báo cáo thành công!')
          } else {
            toast.error('Lỗi')
          }
        } else {
          toast.error('Lỗi')
        }
        break

      default:
        break
    }
  }

  return (
    <>
      {state.modalAction ? (
        <Modal onCancel={handleCancelModal} onOk={handleOkModal}>
          <div className={cx('modal')}>
            <h1 className={cx('title')}>
              {state.modalAction === 'REPORT_POST'
                ? 'Báo cáo bài viết'
                : 'Báo cáo bình luận'}
            </h1>
            {renderModalContent()}
          </div>
        </Modal>
      ) : null}
      <ToastContainer />
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <h1 className={cx('title')}>{state.post.title}</h1>
          <Link
            className={cx('category')}
            to={
              state.post.id
                ? generatePath(routers.category, {
                    id: state.post.id_category,
                    slug: generatePathSlug(state.post.category_name),
                  })
                : ''
            }
          >
            <FontAwesomeIcon
              icon={faGreaterThan}
              className={cx('link-category-icon')}
            />
            {state.post.category_name}
          </Link>
          <div
            className={cx('post-content')}
            dangerouslySetInnerHTML={{ __html: state.post.content }}
          />
          <div className={cx('info')}>
            <div className={cx('viewed')} title='Lươt xem'>
              <FontAwesomeIcon icon={faEye} />
              {state.post.viewed}
            </div>
            <div className={cx('created-time')} title='Thời gian đăng'>
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              {createdDate}
            </div>
            {state.post.updated_at && (
              <div className={cx('updated-time')} title='Thời gian cập nhật'>
                <FontAwesomeIcon icon={faRotate} />
                {updatedTime}
              </div>
            )}
            <div className={cx('author')} title='Tác giả'>
              <FontAwesomeIcon icon={faUser} />
              {state.post.author_name}
            </div>
          </div>
          <div className={cx('action')}>
            <div className={cx('like-post')}>
              <Button
                size='small-medium'
                fade={!state.post.isLikeByUser}
                onClick={handleLikePost}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
              <span className={cx('num-like')}>{state.post.num_like}</span>
            </div>
            <AddComment onAddComment={handleAddComment} />
            <Button size='small-medium' warring onClick={handleReportPost}>
              <FontAwesomeIcon icon={faWarning} />
            </Button>
          </div>
          <Comments
            data={state.comments}
            onReply={handleReply}
            onLikeComment={handleLikeComment}
          />
        </div>
        <Aside />
      </div>
    </>
  )
}
export default Post
