import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 20px;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

//-> we can set default props to a styled component
Row.defaultProps = {
  type: "vertical",
};

export default Row;
