import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    logged: false,
    username: undefined,
    id: undefined,
    permissions: []
  },
  reducers: {
    loginRedux: (state, action) => {
      const { status, username, id } = action.payload
      state.logged = status
      state.username = username
      state.id = id
    },
    addPermissionsRedux: (state, action) => {
      const { permissions } = action.payload
      console.log(permissions)
      state.permissions = permissions
    },
    logoutRedux: (state) => {
      state.logged = false
    }
  }
})

export const { loginRedux, logoutRedux, addPermissionsRedux } =
  loginSlice.actions

export default loginSlice.reducer
