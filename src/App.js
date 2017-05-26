import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Container></Container>
            </div>
        );
    }
}

export default App;