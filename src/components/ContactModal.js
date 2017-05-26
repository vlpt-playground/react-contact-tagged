import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Modal from './Modal';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import Input from './Input';

const ThumbnailWrapper = styled.div`
    /* 레이아웃 */
    padding-top: 3rem;
    padding-bottom: 3rem;
    display: flex;
    justify-content: center;

    /* 색상 */
    background: white;
`;

const Form = styled.div`
    /* 레이아웃 */
    padding: 1rem;

    /* 색상 */
    background: ${oc.gray[0]};
`;

const ButtonsWrapper = styled.div`
    /* 레이아웃 */
    display: flex;
`;

const Button = styled.div`
    /* 레이아웃 */
    padding-top: 1rem;
    padding-bottom: 1rem;
    flex: 1;
    display: inline-block;
    
    /* 기타 */
    cursor: pointer;
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    transition: all .3s;

    /* 색상 */
    color: white;
    background: ${props => oc[props.color][7]};

    /* 마우스가 위에 있을 때 */
    &:hover {
        background: ${props => oc[props.color][6]};
    }

    /* 클릭 될 때 */
    &:active {
        background: ${props => oc[props.color][8]};
    }
`;

Button.propType = {
    color: PropTypes.string
};

class ContactModal extends Component {

    static propTypes = { 
        visible: PropTypes.bool, 
        // 모달의 모드
        mode: PropTypes.oneOf(['create', 'modify']), 
        // 모달에 들어갈 데이터 값
        name: PropTypes.string, 
        phone: PropTypes.string, 
        color: PropTypes.string, 
        onHide: PropTypes.func, 
        onAction: PropTypes.func, // 추가 혹은 수정
        onRemove: PropTypes.func // 나중에 구현할 삭제
    }

    handleChange = (e) => {
        const { onChange } = this.props;
        onChange({
            name: e.target.name,
            value: e.target.value
        });
    }

    render() {
        const { handleChange } = this;
        const { 
            visible,
            mode,
            name,
            phone,
            color,
            onHide,
            onAction
        } = this.props;

        return (
            <Modal visible={visible} onHide={onHide}>
                <ThumbnailWrapper>
                    <Thumbnail size="8rem" color={color}/>
                </ThumbnailWrapper>
                <Form>
                    <Input 
                        name="name"
                        placeholder="이름"
                        value={name}
                        onChange={handleChange}
                    />
                    <Input 
                        name="phone"
                        placeholder="전화번호"
                        value={phone}
                        onChange={handleChange}
                    />
                </Form>
                <ButtonsWrapper>
                    <Button color="teal" onClick={onAction}>
	                    { mode === 'create' ? '추가' : '수정'}
                    </Button>
                    <Button color="gray" onClick={onHide}>
	                    취소
                    </Button>
                </ButtonsWrapper>
            </Modal>
        );
    }
}

export default ContactModal;