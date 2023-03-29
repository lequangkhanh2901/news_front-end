const initState = {
  menuList: [],
  modalAction: '',
  logInData: {
    email: '',
    password: '',
  },
  errMessage: '',
  signUpData: {
    name: '',
    email: '',
    password: '',
    rePassword: '',
  },
  isLoading: false,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE_LOGIN':
      return { ...state, modalAction: 'LOG_IN', logInData: { email: '', password: '' } }
    case 'HANDLE_LOGOUT':
      return { ...state, modalAction: 'LOG_OUT' }
    case 'HANDLE_SIGNUP':
      return { ...state, modalAction: 'SIGN_UP' }
    case 'UPDATE_MENU_LIST':
      return { ...state, menuList: action.payload }
    case 'CANCEL_MODAL':
      return { ...state, modalAction: '' }
    case 'LOGED_OUT':
      return { ...state, modalAction: '' }
    case 'UPDATE_LOGIN_EMAIL':
      return {
        ...state,
        logInData: {
          ...state.logInData,
          email: action.payload,
        },
      }
    case 'UPDATE_LOGIN_PASSWORD':
      return {
        ...state,
        logInData: {
          ...state.logInData,
          password: action.payload,
        },
      }
    case 'UPDATE_ERR_MESSAGE':
      return { ...state, errMessage: action.payload }
    case 'REMOVE_ACTION':
      return {
        ...state,
        modalAction: '',
      }
    case 'UPDATE_SIGNUP_NAME':
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          name: action.payload,
        },
      }
    case 'UPDATE_SIGNUP_EMAIL':
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          email: action.payload,
        },
      }
    case 'UPDATE_SIGNUP_PASSWORD':
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          password: action.payload,
        },
      }
    case 'UPDATE_SIGNUP_REPASSWORD':
      return {
        ...state,
        signUpData: {
          ...state.signUpData,
          rePassword: action.payload,
        },
      }
    case 'SIGNUP_SUCCESS':
      return { ...state, modalAction: 'SIGNED_UP' }
    case 'SET_LOADING':
      return { ...state, isLoading: true }
    case 'REMOVE_LOADING':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export { initState, reducer }
