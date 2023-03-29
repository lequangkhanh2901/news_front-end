import {
  faPenToSquare,
  faTrashCan,
  faTrashCanArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import Button from '../Button'

import styles from './CategoryItem.module.scss'

const cx = classNames.bind(styles)

function CategoryItem({ name, onEdit, onDelete, trash }) {
  return (
    <div className={cx('category')}>
      <div className={cx('category-name')}>{name}</div>
      <div className={cx('category-action')}>
        <Button onClick={onEdit} size='small-medium'>
          <FontAwesomeIcon icon={trash ? faTrashCanArrowUp : faPenToSquare} />
        </Button>
        <Button onClick={onDelete} danger size='small-medium'>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </div>
    </div>
  )
}

export default CategoryItem
