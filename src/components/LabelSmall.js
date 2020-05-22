import styled from 'styled-components';
import deviceConfiguration from '../responsiveForDevices/DeviceConfiguration';

const LabelSmall = styled.h4`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-weight: ${({ weight }) => weight || '600'};
  font-size: ${({ fontSize }) => fontSize || '15px'};
  text-align: ${({ align }) => align || 'left'};
  padding: 5px 0;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media ${deviceConfiguration.tablet} {
    font-size: ${({ fontSize }) => fontSize || '20px'};
  }
  @media ${deviceConfiguration.laptop} {
    font-size: ${({ fontSize }) => fontSize || '23px'};
  } 
  @media ${deviceConfiguration.laptopL} {
    font-size: ${({ fontSize }) => fontSize || '26px'};
  }
`;

export default LabelSmall;
