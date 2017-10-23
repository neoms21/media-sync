// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import withSelectFiles from 'react-select-files'
// import FileSelector from "./components/upload";
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//
//           <input type="file" multiple onChange={ (e) => console.log(e.target.files) } />
//       </div>
//     );
//   }
// }
//
// export default App;
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import FileSelector from "./components/FileSelector";

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <div className="container">
                        <FileSelector />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
