import styled from 'styled-components';

interface DivProps {
    $bgc?: string;
}
export const TasksWrapper = styled.div<DivProps>`
  background-color: ${props => props.$bgc}40;
`;
