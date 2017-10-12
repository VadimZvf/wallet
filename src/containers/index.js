import { connect } from 'react-redux';
import { createConnect } from '../reducer';

const selector = createConnect((state, key) => {
    return { ...state[key] };
});

const Hello = ({ text }) => `Hello ${text}!`;

export default connect(selector)(Hello);
