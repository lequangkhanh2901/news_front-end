import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    id: 0,
    role: -1,
    token: '',
    avartarCDN: '',
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name
      state.id = action.payload.id
      state.role = action.payload.role
      state.token = action.payload.token
      state.avartarCDN = action.payload.avartarCDN
    },
  },
})

export const { update } = userSlice.actions
export default userSlice.reducer
