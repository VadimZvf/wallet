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

let reducerKey = 'chunk-wallet';

export default function (key) {
    reducerKey = key || reducerKey;
    return { [reducerKey]: createReducer(initialState, actions) };
}

export const createConnect = connect => state => connect(state, reducerKey);
