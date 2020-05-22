import styled from 'styled-components';
import deviceConfiguration from '../responsiveForDevices/DeviceConfiguration';

const LabelLarge = styled.h2`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-weight: ${({ weight }) => weight || '600'};
  font-size: ${({ fontSize }) => fontSize || '30px'};
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
    font-size: ${({ fontSize }) => fontSize || '37px'};
  }
  @media ${deviceConfiguration.laptop} {
    font-size: ${({ fontSize }) => fontSize || '43px'};
  } 
  @media ${deviceConfiguration.laptopL} {
    font-size: ${({ fontSize }) => fontSize || '52px'};
  } 
`;

export default LabelLarge;
