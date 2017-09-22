import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Slate from './Slate';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    cursor: text;
    padding: 16px;
    border-radius: 2px;
    margin-bottom: 2em;
    box-shadow: inset 0px 1px 8px -3px #ABABAB;
`;

function App(params) {
    return(
        <Container>
            <Slate />
        </Container>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
