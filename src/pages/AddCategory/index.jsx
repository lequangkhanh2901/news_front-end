import classNames from 'classnames/bind'
import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '../../components/Button'
import CategoryItem from '../../components/CategoryItem'
import Modal from '../../components/Modal'

import axiosCt from '../../configs/axiosCT'
import routers from '../../configs/baseRoutes'

import styles from './AddCategory.module.scss'

const cx = classNames.bind(styles)

function AddCategory() {
  const [categories, setCategories] = useState([])
  const [categoryInput, setCategoryInput] = useState('')
  const [temple, setTemple] = useState([])
  const [currentAction, setCurrentAction] = useState({})
  useEffect(() => {
    const controller = new AbortController()
    const getListCategory = async () => {
      const response = await axiosCt.get('/category')
      if (response !== 'fail' && response.code === 200) {
        setCategories(response.data)
      }
    }
    getListCategory()
    return () => {
      controller.abort()
    }
  }, [temple])
  const inputNameId = useId()

  const handleAddCategory = async (e) => {
    if (categoryInput.trim() === '') {
      toast.error('Tên danh mục rỗng')
      return
    }
    const response = await axiosCt.post('/category', { name: categoryInput })
    if (response === 'fail') {
      toast.error('Lỗi')
      return
    }
    toast.success('Đã thêm danh mục')
    setTemple((prev) => [])
    setCategoryInput('')
  }
  const handeCancel = () => {
    setCurrentAction((prev) => ({}))
  }

  const handleOk = async () => {
    if (currentAction.type === 'update') {
      const response = await axiosCt.patch('/category', {
        id: currentAction.id,
        name: currentAction.name,
      })
      setCurrentAction((prev) => ({}))
      if (response !== 'fail' && response.code === 202) {
        toast.success('Đã cập nhật danh mục')
        setTemple((prev) => ({}))
      } else {
        toast.error('Lỗi!')
      }
    }
    if (currentAction.type === 'delete') {
      const response = await axiosCt.delete('/category', {
        id: currentAction.id,
      })
      setCurrentAction((prev) => ({}))
      if (response !== 'fail' && response.code === 200) {
        toast.success('Xóa thành công')
        setTemple((prev) => ({}))
      } else {
        toast.error('Lỗi!')
      }
    }
  }

  return (
    <>
      <ToastContainer className={cx('toast')} />
      {Object.keys(currentAction).length !== 0 &&
        currentAction.type === 'update' && (
          <Modal onCancel={handeCancel} onOk={handleOk}>
            <input
              spellCheck={false}
              className={cx('input-edit-category')}
              value={currentAction.name}
              onChange={(e) =>
                setCurrentAction((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Modal>
        )}
      {Object.keys(currentAction).length !== 0 &&
        currentAction.type === 'delete' && (
          <Modal onCancel={handeCancel} onOk={handleOk}>
            <p className={cx('confirm-mes')}>
              Xác nhận xóa danh mục{' '}
              <span className={cx('category-name')}>{currentAction.name}</span>{' '}
              vào thùng rác?
            </p>
          </Modal>
        )}
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>Thêm danh mục</h2>
        <div>
          <label htmlFor={inputNameId}>Tên danh mục</label>
          <input
            id={inputNameId}
            className={cx('input-name')}
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
          <Button onClick={handleAddCategory} size='medium' inlineBlock>
            Thêm
          </Button>
          {/* <button
            className={cx('btn-add-category')}
            onClick={handleAddCategory}
          >
            Thêm
          </button> */}
        </div>
        <div className={cx('category-list')}>
          <h3 className={cx('title-curent-category')}>Danh mục hiện có</h3>
          <div className={cx('categories')}>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                name={category.name}
                onEdit={() =>
                  setCurrentAction((prev) => ({
                    id: category.id,
                    name: category.name,
                    type: 'update',
                  }))
                }
                onDelete={() =>
                  setCurrentAction((prev) => ({
                    id: category.id,
                    name: category.name,
                    type: 'delete',
                  }))
                }
              />
            ))}
          </div>
        </div>
        <Button to={routers.categoryTrash} size='large'>
          Thùng rác
        </Button>
      </div>
    </>
  )
}

export default AddCategory
