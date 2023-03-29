import { forwardRef, useState } from 'react'
import image from '../../assets/image/onErrorImg.png'

function Image(
  { src, alt, className, fallback: customFallback = image, ...props },
  ref
) {
  const [fallback, setFallback] = useState('')
  const handleError = () => {
    setFallback(customFallback)
  }
  return (
    <img
      ref={ref}
      alt={alt}
      src={fallback || src}
      onError={handleError}
      {...props}
      className={className}
    />
  )
}

export default forwardRef(Image)
