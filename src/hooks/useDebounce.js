import { useEffect, useState } from 'react'

function useDebounce(value, timeOut) {
  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, timeOut)
    return () => {
      clearTimeout(handler)
    }
  }, [value])
  return debounceValue
}

export default useDebounce
