import styled, { css } from 'styled-components';

//-> IMP we wrap it in template literals, hence we can also write the javascript code inside it.

const evaluatedValue = (10 > 20);

//-> const alignment = `text-align: center;`;

//-> 'css' for the syntax highlighting in vscode.
const alignment = css`
  text-align: center;
  background-color: ${evaluatedValue ? "yellow" : "red"};
`;


const Heading = styled.h1`
${(props) => props.type==="h1" && css`
  font-size: 30px;
  font-weight: 600;
`}
${(props) => props.type==="h2" && css`
  font-size: 20px;
  font-weight: 500;
`}
${(props) => props.as==="h3" && css`
  font-size: 10px;
  font-weight: 400;
`}
  font-size: ${(evaluatedValue) ? "30px" : "5px"};
  font-weight: 600;
  background-color: yellow;
  ${alignment}
`;

export default Heading;