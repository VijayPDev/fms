/* Entry File, imports the input component*/
import React from 'react';
import ReactDOM from 'react-dom';
import InputForm from './input-form';

export default class MainPage extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Pizza Ordering System</h1>
                <InputForm />
            </div>
        )
    }

}

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
);