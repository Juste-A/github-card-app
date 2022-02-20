import React from 'react';
import ReactDOM from 'react-dom';

let mountNode = document.getElementById('root');

const App = ({title}) => (
    <div className='header'>{title}</div>
);

ReactDOM.render(
    <App title='The GitHub Cards App' />,
    mountNode,
);
