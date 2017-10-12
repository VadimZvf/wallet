import { connect } from 'react-redux';
import { createConnect } from '../reducer';

const selector = createConnect(state => {
    return { ...state };
});

const Hello = ({ text }) => `Hello ${text}!`;

export default connect(selector)(Hello);
