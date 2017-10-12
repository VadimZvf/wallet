import { INIT } from './actions/init';
import { createReducer, nextState } from './utilities';

const initialState = {
    isPending: false,
    isReady: false,
    text: 'world'
};

export const actions = {
    [INIT]: state => nextState(state, { isReady: true })
};

const reducerKey = 'chunk-wallet';

export const createConnect = connect => state => connect(state[reducerKey]);

export default { [reducerKey]: createReducer(initialState, actions) };
