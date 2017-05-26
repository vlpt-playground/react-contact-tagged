import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import ViewSelector from './components/ViewSelector';
import FloatingButton from './components/FloatingButton';
import ContactModal from './components/ContactModal';
import Dimmed from './components/Dimmed';
import shortid from 'shortid';
import ContactList from './components/ContactList';

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
        },
        contacts: [
            {
                "id": "SyKw5cyAl",
                "name": "김민준",
                "phone": "010-0000-0000",
                "color": "#40c057",
                "favorite": true
            },
            {
                "id": "r1s_9c10l",
                "name": "아벳",
                "phone": "010-0000-0001",
                "color": "#12b886",
                "favorite": true
            },
            {
                "id": "BJcFqc10l",
                "name": "베티",
                "phone": "010-0000-0002",
                "color": "#fd7e14",
                "favorite": false
            },
            {
                "id": "BJUcqqk0l",
                "name": "찰리",
                "phone": "010-0000-0003",
                "color": "#15aabf",
                "favorite": false
            },
            {
                "id": "rJHoq91Cl",
                "name": "데이비드",
                "phone": "010-0000-0004",
                "color": "#e64980",
                "favorite": false
            }
        ]
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

        change: ({name, value}) => {
            this.setState({
                modal: {
                    ...this.state.modal, 
                    [name]: value // 인자로 전달받은 name 의 값을 value 로 설정
                }
            })
        },
        
        action: {
            create: () => {
                // 고유 ID 생성
                const id = shortid.generate();

                // 레퍼런스 생성
                const { contacts, modal: { name, phone, color } } = this.state;

                // 데이터 생성
                const contact = {
                    id,
                    name,
                    phone,
                    color,
                    favorite: false // 즐겨찾기의 기본값은 false
                };

                this.setState({
                    // 기존 배열에있던것들을 집어넣고, contact 를 뒤에 추가한 새 배열로 설정
                    contacts: [...contacts, contact]
                });
                
                // 모달 닫기
                this.modalHandler.hide();
            },
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
            modal,
            contacts
        } = this.state;

        return (
            <div>
                <Header/>
                 <ViewSelector onSelect={handleSelectView} selected={view}/>
                <Container visible={view==='favorite'}>
                    즐겨찾기
                </Container>
                <Container visible={view==='list'}>
                    <ContactList contacts={contacts}/>
                </Container>
                <ContactModal 
                    {...modal} 
                    onHide={modalHandler.hide} 
                    onChange={modalHandler.change}
                    onAction={modalHandler.action[modal.mode]}/>
                <Dimmed visible={modal.visible}/>
                <FloatingButton onClick={handleFloatingButtonClick}/>
            </div>
        );
    }
}

export default App;