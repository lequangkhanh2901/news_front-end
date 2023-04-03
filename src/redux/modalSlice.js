import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    action: '',
    content: null,
    onOk: undefined,
    onCancel: undefined,
  },
  reducers: {
    updateModal: (state, action) => {
      state.action = action.payload.action
      state.content = action.payload.content
      state.onOk = action.payload.onOk
      state.onCancel = action.payload.onCancel
    },
  },
})

export const { updateModal } = modalSlice.actions
export default modalSlice.reducer
