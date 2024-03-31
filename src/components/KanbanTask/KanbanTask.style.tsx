import styled from 'styled-components';

interface DivProps {
        $bgc?: string;
}
export const Close = styled.div`
  display: none;
`;
export const Container = styled.div<DivProps>`
  width: 100%;
  max-width: 200px;
  min-height: 180px;
  position: relative;
  box-shadow: 0 3px 10px 5px rgba(40, 75, 100, 0.12);
  color: white;
  background-color: ${props => props.$bgc}80;
  &:hover {
        ${Close} {
            display: block;
            position: absolute;
            top: 4px;
            right: 4px;
      }
  }
`;

