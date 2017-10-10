import { INIT } from './actions/init';
import { createReducer, nextState } from '../utilities';

const initialState = {
    isPending: false,
    isReady: false
};

export const actions = {
    [INIT]: state => nextState(state, { isReady: true })
};

export default createReducer(initialState, actions);
