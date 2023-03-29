const initState = {
  comments: [],
  post: {},
  modalAction: '',
  reason: '',
  idComment: undefined,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_POST':
      return { ...state, post: action.payload }
    case 'UPDATE_COMMENTS':
      return { ...state, comments: action.payload }
    case 'UPDATE_MODAL_ACTION':
      if (action.payload === '') {
        return {
          ...state,
          modalAction: action.payload,
          reason: '',
          idComment: undefined,
        }
      }
      return { ...state, modalAction: action.payload }
    case 'UPDATE_REASON':
      if (action.payload.startsWith(' ') || action.payload.length > 100) {
        return state
      }
      return {
        ...state,
        reason: action.payload,
      }
    default:
      return state
  }
}

export { initState, reducer }
