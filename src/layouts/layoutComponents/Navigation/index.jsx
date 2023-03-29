import { useState, useEffect } from 'react'
import classNames from 'classnames/bind'

import styles from './Navigation.module.scss'
import { NavLink, generatePath } from 'react-router-dom'
import routes from '../../../configs/baseRoutes'
import axiosCt from '../../../configs/axiosCT'
import { generatePathSlug } from '../../../optionalFunction'

const cx = classNames.bind(styles)

function Navigation() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const getListCategory = async () => {
      const response = await axiosCt.get('/category')
      if (response !== 'fail' && response.code === 200) {
        setCategories(response.data)
      }
    }
    getListCategory()
  }, [])

  return (
    <div className={cx('wrapper')}>
      <nav className={cx('navigation')}>
        {categories.map((item) => {
          const path = generatePath(routes.category, {
            id: item.id,
            slug: generatePathSlug(item.name),
          })
          return (
            <NavLink
              key={item.id}
              to={path}
              className={(nav) => cx('nav-item', { active: nav.isActive })}
            >
              <span className={cx('nav-title')}>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}

export default Navigation
