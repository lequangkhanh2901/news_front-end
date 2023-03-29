import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
  to,
  href,
  onClick,
  size,
  children,
  danger,
  green,
  inlineBlock,
  className,
  rounded,
  fade,
  warring,
}) {
  let Component
  if (to) {
    Component = Link
  } else if (href) {
    Component = 'a'
  } else {
    Component = 'button'
  }
  const componentProp = {
    to,
    href,
    onClick,
  }
  const componentClassName = cx('button', {
    large: size === 'large',
    small: size === 'small',
    'small-medium': size === 'small-medium',
    'large-medium': size === 'large-medium',
    medium: size === 'medium',
    danger,
    green,
    'inline-block': inlineBlock,
    rounded: rounded,
    fade,
    warring,
  })
  return (
    <Component
      {...componentProp}
      className={componentClassName + (className ? ' ' + className : '')}
    >
      {children}
    </Component>
  )
}

export default Button
