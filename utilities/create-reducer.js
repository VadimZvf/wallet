export default (initialState, handlers) =>
    (state = initialState, action) =>
        handlers[action.type] ? handlers[action.type].call(null, state, action) : state;
