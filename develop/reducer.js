import { combineReducers } from 'redux';
import reducer from '../src/reducer';

export default combineReducers({
    ...reducer('wallet')
});
