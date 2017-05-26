import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import ViewSelector from './components/ViewSelector';
import FloatingButton from './components/FloatingButton';

class App extends Component {
    state = {
        view: 'favorite'
    }

    handleSelectView = (view) => this.setState({view})

    render() {
        const { handleSelectView } = this;
        const { view } = this.state;

        return (
            <div>
                <Header/>
                 <ViewSelector onSelect={handleSelectView} selected={view}/>
                <Container visible={view==='favorite'}>
                    즐겨찾기
                </Container>
                <Container visible={view==='list'}>
                    리스트
                </Container>
                <FloatingButton/>
            </div>
        );
    }
}

export default App;