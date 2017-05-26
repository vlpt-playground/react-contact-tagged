import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import ViewSelector from './components/ViewSelector';
import FloatingButton from './components/FloatingButton';
import ContactModal from './components/ContactModal';
import Dimmed from './components/Dimmed';

import oc from 'open-color';

// open-color 기반 랜덤 색상 생성 함수
function generateRandomColor() {
    const colors = [
        'gray',
        'red',
        'pink',
        'grape',
        'violet',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'lime',
        'yellow',
        'orange'
    ];

    // 0 부터 12까지 랜덤 숫자
    const random = Math.floor(Math.random() * 13);

    return oc[colors[random]][6];
}


class App extends Component {
    state = {
        view: 'favorite',
        modal: {
            visible: false,
            mode: null // create 혹은 modify
        }
    }

    // view 선택 메소드 정의
    handleSelectView = (view) => this.setState({view})

    // 모달 관련 함수들
    modalHandler = {
        show: (mode, payload) => {
            this.setState({
                modal: {
                    mode,
                    visible: true,
                    ...payload // payload 안의 값을 풀어서 여기에 넣음
                }
            });
        },
        hide: () => this.setState({modal: {
            ...this.state.modal, // 기존값은 다 그대로 두고
            visible: false // 이 값만 수정
        }}),

        // 이 아래엔 추후 구현될 함수들

        change: null,
        
        action: {
            create: null,
            modify: null,
            remomve: null
        }
    }


    // FloatingButton 이 클릭됐을때 실행되는 메소드
    handleFloatingButtonClick = () => {

        // 현재 view 가 list 가 아니면 list 로 설정
        const { view } = this.state;
        if(view !== 'list') this.setState({view: 'list'});

        // Contact 추가 모달 띄우기
        this.modalHandler.show(
            'create',
            {
                name: '',
                phone: '',
                color: generateRandomColor()
            }
        );
    }

    render() {
        const { 
            handleSelectView,
            handleFloatingButtonClick,
            modalHandler
        } = this;
        const { 
            view,
            modal
        } = this.state;

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
                <ContactModal {...modal} onHide={modalHandler.hide}/>
                <Dimmed visible={modal.visible}/>
                <FloatingButton onClick={handleFloatingButtonClick}/>
            </div>
        );
    }
}

export default App;