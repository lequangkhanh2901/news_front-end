import axios from 'axios'
import { getCookieToken } from '../optionalFunction'

const axiosCt = {
  async get(link) {
    const token = getCookieToken()
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + link, {
        headers: {
          authorization: token,
        },
      })
      return res.data
    } catch (error) {
      return 'fail'
    }
  },
  async post(link, data) {
    const token = getCookieToken()
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + link, data, {
        headers: {
          authorization: token,
        },
      })
      return res.data
    } catch (error) {
      return 'fail'
    }
  },
  async postFile(link, data) {
    const token = getCookieToken()
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + link, data, {
        headers: {
          authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    } catch (error) {
      return 'fail'
    }
  },
  async patch(link, data) {
    const token = getCookieToken()
    try {
      const res = await axios.patch(import.meta.env.VITE_API_URL + link, data, {
        headers: {
          authorization: token,
        },
      })
      return res.data
    } catch (error) {
      return 'fail'
    }
  },
  async delete(link, data) {
    const token = getCookieToken()
    try {
      const res = await axios.delete(import.meta.env.VITE_API_URL + link, {
        headers: {
          authorization: token,
        },
        data,
      })
      return res.data
    } catch (error) {
      return 'fail'
    }
  },
}

export default axiosCt
