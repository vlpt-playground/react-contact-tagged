import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

class ContactList extends Component {

    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        search: PropTypes.string, // 검색 키워드
        onToggleFavorite: PropTypes.func, // 즐겨찾기 토글
        onOpenModify: PropTypes.func // 수정 모달 띄우기
    }

    render() {
        const { contacts, onOpenModify, onToggleFavorite, search } = this.props;
        const contactList = contacts.filter( // 키워드로 필터링
            c => c.name.indexOf(search) !== -1
        ).sort( // 가나다순으로 정렬
            (a,b) => {
                if(a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            }
        ).map( // 컴포넌트로 매핑
            contact => (
                <ContactItem 
                    key={contact.id} 
                    contact={contact}
                    onOpenModify={onOpenModify}
                    onToggleFavorite={onToggleFavorite}
                />
            )
        );
        return (
            <Wrapper>
                {contactList}
            </Wrapper>
        );
    }
}

export default ContactList;