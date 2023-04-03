import classNames from 'classnames/bind'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ClassicEditor from 'ckeditor5-custom-build'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import axiosCT from '../../configs/axiosCT'
import styles from './EditPost.module.scss'
import Button from '../../components/Button'
import { toast, ToastContainer } from 'react-toastify'

const cx = classNames.bind(styles)

function EditPost() {
  const [categories, setCategories] = useState([])
  const [post, setPost] = useState({})
  const { id } = useParams()
  const [postTitle, setPostTitle] = useState('')
  const [sort, setSort] = useState('')
  const [avartarSrc, setAvartarSrc] = useState('')
  const [avartarFile, setAvartarFile] = useState()
  const [ckContent, setCkContent] = useState('')
  const [currentCategory, setCurrentCategory] = useState()
  useEffect(() => {
    const controller = new AbortController()

    const fetchCategories = async () => {
      const response = await axiosCT.get('/category')
      if (response !== 'fail' && response.code === 200) {
        setCategories(response.data)
      }
    }
    const fetchPost = async () => {
      const response = await axiosCT.get('/post/un-censor/' + id)
      if (response !== 'fail' && response.code === 200) {
        setPost(response.data)
        setPostTitle(response.data.title)
        setSort(response.data.sort_description)
        setAvartarSrc(response.data.avartar_cdn)
        setCkContent(response.data.content)
        setCurrentCategory(response.data.id_category)
      }
    }

    fetchCategories()
    fetchPost()

    return () => {
      controller.abort()
    }
  }, [id])
  useEffect(() => {
    if (avartarFile) {
      setAvartarSrc(URL.createObjectURL(avartarFile))
    }
    return () => {
      avartarSrc && URL.revokeObjectURL(avartarSrc)
    }
  }, [avartarFile])

  const handleSubmit = async () => {
    console.log(avartarFile)
    const formData = new FormData()
    formData.append('id', id)
    formData.append('title', postTitle)
    formData.append('sort_desc', sort)
    formData.append('category', currentCategory)
    formData.append('file', avartarFile)
    formData.append('prev_avartar_cdn', post.avartar_cdn)
    formData.append('content', ckContent)

    const response = await axiosCT.postFile('/post/update', formData)
    if (response !== 'fail' && response.code === 201) {
      toast.success('Cập nhật thành công')
    } else {
      toast.error('Lỗi!')
    }
  }
  return (
    <>
      <ToastContainer />
      <div className={cx('wrapper')}>
        <h1 className={cx('title')}>Chỉnh sửa bài viết</h1>
        <div className={cx('content')}>
          <div className={cx('post-title')}>
            <input
              type='text'
              placeholder='Tiêu đề bài viết'
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <div className={cx('post-category')}>
            <label> Danh Mục</label>
            <select
              className={cx('category-select')}
              onChange={(e) => setCurrentCategory(e.target.value)}
              value={currentCategory}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={cx('post-sort-desc')}>
            <input
              type='text'
              name=''
              id=''
              placeholder='Mô tả ngắn'
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            />
          </div>
          <div className={cx('avartar')}>
            <label htmlFor='avartar-input'>Ảnh đại diện</label>
            <input
              type='file'
              accept='image/*'
              id='avartar-input'
              onChange={(e) => setAvartarFile(e.target.files[0])}
            />
            {avartarSrc && (
              <img
                className={cx('preview-img')}
                src={avartarSrc}
                alt={postTitle}
              />
            )}
          </div>
          <div className={cx('content')}>
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
          <Button
            size='large'
            onClick={handleSubmit}
            className={cx('btn-submit')}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </>
  )
}

export default EditPost
