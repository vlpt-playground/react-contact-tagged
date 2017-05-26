import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';

const Wrapper = styled.div`
    /* 레이아웃 */
    padding: 1rem;
    position: relative;
    overflow: hidden;
    display: flex;

    /* 색상 */
    background: ${oc.gray[0]};
    border: 1px solid ${oc.gray[2]};

    /* 애니메이션 */
    transition: all .25s;

    /* 사이 간격 */
    & + & {
        margin-top: 1rem;   
    }

    .actions {
        /* 레이아웃 */
        position: absolute;
        top: 0;
        right: -3rem; /* 기본적으로는 숨겨있음 */
        width: 3rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column; /* 세로로 나열 */

        /* 색상 */
        background: ${oc.gray[1]};
        border-left: 1px solid ${oc.gray[2]};
        opacity: 0; /* 기본적으론 투명함 */

        /* 애니메이션 */
        transition: all .4s;
    }

    /* 커서가 위에 있으면 */
    &:hover {
        border: 1px solid ${oc.gray[4]};
        background: white;

        /* actions 를 보여준다 */
        .actions {
            opacity: 1;
            right: 0rem;
        }
    }
`

const Info = styled.div`
    /* 레이아웃 */
    margin-left: 1rem;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column; 
`;

const Name = styled.div`
    font-size: 1.25rem;
    color: ${oc.gray[9]};
    font-weight: 500;
`;

const Phone = styled.div`
    color: ${oc.gray[6]}
    margin-top: 0.25rem;
`;
class ContactItem extends Component {

    static propTypes = {
        contact: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            phone: PropTypes.string,
            color: PropTypes.string,
            favorite: PropTypes.bool
        }),
        onToggleFavorite: PropTypes.func,
        onOpenModify: PropTypes.func
    }

    render() {
        const {
            contact: { name, phone, favorite, id, color }
        } = this.props;

        return (
            <Wrapper>
                <Thumbnail color={color}/>
                <Info>
                    <Name>{name}</Name>
                    <Phone>{phone}</Phone>
                </Info>
                <div className="actions">Hi</div>
            </Wrapper>
        );
    }
}

export default ContactItem;