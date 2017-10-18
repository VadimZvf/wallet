import { INIT } from './actions/init';
import { createReducer, nextState } from './utilities';

const initialState = {
    isPending: false,
    isReady: false,
    daysLeft: 30,
    writeOffs: [
        {
            name: 'Квартира',
            value: 10000
        },
        {
            name: 'Телефон',
            value: 300
        }
    ],
    receipts: [
        {
            name: 'ЗП',
            value: 15000
        }
    ],
    history: [
        {
            isReceipt: false,
            name: 'еда',
            value: 100
        },
        {
            isReceipt: false,
            name: 'вода',
            value: 10
        },
        {
            isReceipt: true,
            name: 'носки',
            value: 32
        }
    ]
};

export const actions = {
    [INIT]: state => nextState(state, { isReady: true })
};

let reducerKey = 'chunk-wallet';

export default function (key) {
    reducerKey = key || reducerKey;
    return { [reducerKey]: createReducer(initialState, actions) };
}

export const createSelector = connect => state => connect(state, reducerKey);
