import { faBan, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import { Link, generatePath } from 'react-router-dom'

import Button from '../../../../components/Button'
import styles from './UserItem.module.scss'
import routers from '../../../../configs/baseRoutes'

const cx = classNames.bind(styles)

function UserItem({ data, onActionUserClick }) {
  const date = new Date(data.created_at)
  const timeCreated = `${date.getDay()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  return (
    <tr className={cx('wrapper')}>
      <td>{data.id}</td>
      <td>
        <Link to={generatePath(routers.user, { id: data.id })}>
          {data.name}
        </Link>
      </td>
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
