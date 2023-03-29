import classNames from 'classnames/bind'
import { useEffect, useId, useRef } from 'react'
import { useState } from 'react'
import ClassicEditor from 'ckeditor5-custom-build'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import axiosCt from '../../configs/axiosCT'
import styles from './WritePost.module.scss'

const cx = classNames.bind(styles)

function WritePost() {
  const [categories, setCategories] = useState([])
  const [src, setSrc] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [ckContent, setCkContent] = useState('')
  const [selectCategoryValue, setSelectCategoryValue] = useState('')
  const titleRef = useRef()
  const decrRef = useRef()
  const titleId = useId()
  const avartarId = useId()
  const sortDescrId = useId()
  useEffect(() => {
    const controller = new AbortController()
    const getCategories = async () => {
      const res = await axiosCt.get('/category')
      if (res !== 'fail' && res.code === 200) {
        setCategories(res.data)
        setSelectCategoryValue(res.data[0].id)
      }
    }
    getCategories()
    return () => controller.abort()
  }, [])

  const updateError = (err) => {
    setError(err)
    setTimeout(() => {
      setError('')
    }, 3000)
  }

  const handleSubmitClick = (e) => {
    if (titleRef.current.value.trim() === '') {
      updateError('Tiêu đề trống!')
      return
    }
    if (decrRef.current.value.trim() === '') {
      updateError('Mô tả trống!')
      return
    }
    if (decrRef.current.value.length > 300) {
      updateError('Mô tả quá dài!')
      return
    }
    if (src === '') {
      updateError('Ảnh đại diện trống!')
      return
    }
    if (ckContent.trim() === '') {
      updateError('Nội dung trống!')
      return
    }
    const postData = async () => {
      const formData = new FormData()
      // formData.append('id_category', selectCategoryValue)
      // formData.append('title', titleRef.current.value)
      formData.append('file', file)
      formData.append('title', titleRef.current.value)
      formData.append('sort_description', decrRef.current.value)
      formData.append('content', ckContent)
      formData.append('id_category', selectCategoryValue)
      const resp = await axiosCt.postFile('/avartar-post', formData)
      // for (let [key, value] of formData.entries()) {
      // }
      if (resp === 'fail') {
        updateError('Lỗi. Kiểm tra lại kích thước ảnh đại diện!')
        return
      }
      // const response = await axiosCt.post('/post',{

      // })
      return
      // const res = await axiosCt.post(
      //   '/post',
      //   // formData
      //   {
      //     id_category: selectCategoryValue,
      //     title: titleRef.current.value,
      //     sort_description: decrRef.current.value,
      //     content: ckContent,
      //     // file: file,
      //   }
      // )
      // console.log(res)
    }
    postData()
  }

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Thêm bài viết</h2>
      <div>
        <label htmlFor={titleId} className={cx('')}>
          Tiêu đề
        </label>
        <input id={titleId} ref={titleRef} className={cx('input-title')} />
      </div>
      <div>
        <label htmlFor={sortDescrId}>Mô tả ngắn</label>
        <input id={sortDescrId} ref={decrRef} />
      </div>
      <div>
        <label htmlFor={avartarId}>Ảnh đại diện</label>
        <input
          id={avartarId}
          type='file'
          onChange={(e) => {
            setFile(e.target.files[0])
            setSrc(URL.createObjectURL(e.target.files[0]))
          }}
        />
        <img
          src={src}
          className={cx('image-preview', src && 'display')}
          alt='img'
        />
      </div>
      <div>
        <label>Danh mục</label>
        <select
          className={cx('category-select')}
          value={selectCategoryValue}
          onChange={(e) => setSelectCategoryValue(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <CKEditor
          className={cx('editor')}
          editor={ClassicEditor}
          data={ckContent}
          config={{
            ckfinder: {
              uploadUrl: import.meta.env.VITE_API_URL + '/upload',
            },
          }}
          onChange={(e, editor) => {
            setCkContent(editor.getData())
          }}
        />
      </div>
      <div>
        <button className={cx('btn-submit')} onClick={handleSubmitClick}>
          Đăng
        </button>
        <p className={cx('warn')}>{error}</p>
      </div>
    </div>
  )
}

export default WritePost
