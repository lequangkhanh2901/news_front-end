const initState = {
  modalAction: '',
  file: null,
  error: '',
  name: '',
  isLoadingModal: false,
  oldPass: '',
  newPass: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_MODAL_ACTION':
      if (action.payload === '') {
        return initState
      }
      return {
        ...state,
        modalAction: action.payload,
      }
    case 'UPDATE_FILE':
      return {
        ...state,
        file: action.payload,
      }
    case 'UPDATE_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      }
    case 'CHANGE_IS_LOADING':
      return {
        ...state,
        isLoadingModal: action.payload,
      }
    case 'UPDATE_OLD_PASS':
      return {
        ...state,
        oldPass: action.payload,
      }
    case 'UPDATE_NEW_PASS':
      return {
        ...state,
        newPass: action.payload,
      }
    default:
      return state
  }
}
export { initState, reducer }
