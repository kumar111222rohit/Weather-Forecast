import styled from 'styled-components';
import deviceConfiguration from '../responsiveForDevices/DeviceConfiguration';

const Text = styled.span`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-size: ${({ fontSize }) => fontSize || '12px'};
  text-align: ${({ align }) => align || 'left'};

  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media ${deviceConfiguration.tablet} {
    font-size: ${({ fontSize }) => fontSize || '15px'};
  }
  @media ${deviceConfiguration.laptop} {
    font-size: ${({ fontSize }) => fontSize || '17px'};
  } 
  @media ${deviceConfiguration.laptopL} {
    font-size: ${({ fontSize }) => fontSize || '19px'};
  }
`;

export default Text;
