import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import CategoryItem from '../../components/CategoryItem'
import Modal from '../../components/Modal'
import axiosCT from '../../configs/axiosCT'
import styles from './CategoryTrash.module.scss'

const cx = classNames.bind(styles)

function CategoryTrash() {
  const [categoriesTrash, setCategoriesTrash] = useState([])
  const [currentAction, setCurrentAction] = useState({})
  const [temple, setTemple] = useState([])
  useEffect(() => {
    const controler = new AbortController()
    const getTrash = async () => {
      const response = await axiosCT.get('/category/trash')
      if (response !== 'fail' && response.code === 200) {
        setCategoriesTrash((prev) => response.data)
      }
    }
    getTrash()
    return () => {
      controler.abort()
    }
  }, [temple])

  const handleOk = async () => {
    if (currentAction.type === 'force-delete') {
      const response = await axiosCT.delete('/category/force', {
        id: currentAction.id,
      })
      setCurrentAction((prev) => ({}))
      if (response !== 'fail' && response.code === 201) {
        toast.success('Đã xóa thành công')
        setTemple((prev) => [])
      } else {
        toast.error('Lỗi!')
      }
    }
    if (currentAction.type === 'restore') {
      const response = await axiosCT.patch('/category', {
        id: currentAction.id,
        status: 0,
        name: currentAction.name,
      })
      setCurrentAction((prev) => ({}))
      if (response !== 'fail' && response.code === 202) {
        toast.success('Khôi phục thành công.')
        setTemple((prev) => [])
      } else {
        toast.error('Lỗi!')
      }
    }
  }
  return (
    <>
      <ToastContainer />
      {Object.keys(currentAction).length !== 0 && (
        <Modal
          onCancel={() => setCurrentAction((prev) => ({}))}
          onOk={handleOk}
        >
          {currentAction.type === 'force-delete' && (
            <>
              <p className={cx('confirm')}>
                Có chắc chắn muốn xóa{' '}
                <span className={cx('category-name')}>
                  {currentAction.name}
                </span>{' '}
                vĩnh viễn?
              </p>
              <p className={cx('warning')}>
                Sau khi xóa không thể khôi phục lại!
              </p>
            </>
          )}
          {currentAction.type === 'restore' && <p>Khôi phục danh mục?</p>}
        </Modal>
      )}
      {/* {Object.keys(currentAction).length !== 0 && currentAction.type === 'restore' && (
        <Modal onCancel={() => setCurrentAction((prev) => ({}))} onOk={handleOk}>
          <p>Khôi phục danh mục?</p>
        </Modal>
      )} */}
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>Thùng rác danh mục</h2>
        <div className={cx('trashes')}>
          {categoriesTrash.map((category) => (
            <CategoryItem
              key={category.id}
              name={category.name}
              onEdit={() =>
                setCurrentAction((prev) => ({
                  id: category.id,
                  name: category.name,
                  type: 'restore',
                }))
              }
              onDelete={() => {
                setCurrentAction((prev) => ({
                  id: category.id,
                  name: category.name,
                  type: 'force-delete',
                }))
              }}
              trash
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoryTrash
