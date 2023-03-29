const generatePathSlug = (string = '') => {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/ /g, '-')
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const setCookieToken = (token) => {
  if (token) {
    const today = new Date()
    const expire = new Date()
    expire.setTime(today.getTime() + 3600000 * 24 * 14)

    document.cookie = `token=${encodeURIComponent(
      token
    )};expires=${expire.toUTCString()}; domain=http://localhost:5173/ ;path=/`
  } else {
    document.cookie = 'token='
  }
}

const getCookieToken = () => {
  const cookieArr = document.cookie.split(';')
  const cookies = {}
  cookieArr.forEach((item) => {
    const eachCookieArray = item.split('=')
    cookies[eachCookieArray[0].trim()] = eachCookieArray[1]
  })

  if (cookies.token) {
    cookies.token = decodeURIComponent(cookies.token)
  } else {
    cookies.token = ''
  }
  return cookies.token
}

const getTimeString = (time) => {
  const date = new Date(time)
  return `${date.getDay()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export {
  generatePathSlug,
  validateEmail,
  setCookieToken,
  getCookieToken,
  getTimeString,
}
