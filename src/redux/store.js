import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import modalReducer from './modalSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
})
