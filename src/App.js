import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import FileSelector from "./components/FileSelector/fileSelector";

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
