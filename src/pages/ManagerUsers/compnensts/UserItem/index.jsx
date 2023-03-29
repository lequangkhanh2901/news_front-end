import { faBan, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import Button from '../../../../components/Button'

import styles from './UserItem.module.scss'

const cx = classNames.bind(styles)

function UserItem({ data, onActionUserClick }) {
  const date = new Date(data.created_at)
  const timeCreated = `${date.getDay()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  return (
    <tr className={cx('wrapper')}>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{timeCreated}</td>
      <td>
        <Button
          size='small'
          danger
          green={data.status === 1}
          onClick={onActionUserClick}
        >
          <FontAwesomeIcon icon={data.status === 0 ? faBan : faUnlock} />
        </Button>
      </td>
    </tr>
  )
}

export default UserItem
