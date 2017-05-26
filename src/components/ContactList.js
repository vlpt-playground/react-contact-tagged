import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

class ContactList extends Component {

    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        search: PropTypes.string, // 검색 키워드
        onToggleFavorite: PropTypes.func, // 즐겨찾기 토글
        onOpenModify: PropTypes.func // 수정 모달 띄우기
    }

    render() {
        const { contacts, onOpenModify } = this.props;
        const contactList = contacts.map(
            contact => (
                <ContactItem 
                    key={contact.id} 
                    contact={contact}
                    onOpenModify={onOpenModify}
                />
            )
        );
        return (
            <div>
                {contactList}
            </div>
        );
    }
}

export default ContactList;