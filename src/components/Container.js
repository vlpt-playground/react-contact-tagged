import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import { media } from '../lib/style-utils';


const Wrapper = styled.div`
    width: 700px;
    margin: 0 auto;
    padding: 1rem;
   
    /* 모바일 크기 */
    ${media.mobile`
        width: 100%;    
    `}
`;

const Container = ({visible, children}) => visible ? (
    <Wrapper>
        {children}
    </Wrapper>
) : null;

Container.propTypes = {
    visible: PropTypes.bool
};

export default Container;