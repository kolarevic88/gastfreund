import styled from 'styled-components';

interface DivProps {
    $bgc?: string;
}
export const Wrapper = styled.div<DivProps>`
  color: white;
  background-color: ${props => props.$bgc};
`;

