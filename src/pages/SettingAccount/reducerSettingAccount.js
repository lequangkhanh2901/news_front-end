const initState = {
  modalAction: '',
  file: null,
  error: '',
  name: '',
  isLoadingModal: false,
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
    default:
      return state
  }
}
export { initState, reducer }
