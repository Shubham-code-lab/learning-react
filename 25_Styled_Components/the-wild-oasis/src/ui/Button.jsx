import styled, { css } from "styled-components";

const sizes = {
  // tagged template literal
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};


console.log("sizes123", sizes);

const variations = {
  primary: css`
  /*-> design tokens from GlobalStyles variables */
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

//-> Exporting a styled component
const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${props => sizes[props.size]}
  ${props => variations[props.variation]}

  /* font-size: 16px;
  padding: 1.2rem;
  
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  cursor: pointer;
  margin: 20px;

  &:hover {
    background-color: var(--color-brand-700);
  } */
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;

/* 

// Example code for understanding - compiler/linter will ignore this section
///example of how styled components work internally
const sizes1 = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

//converted to
const sizes2 = {
    small: [
        "\n    font-size: 1.2rem;\n    padding: 0.4rem 0.8rem;\n    text-transform: uppercase;\n    font-weight: 600;\n    text-align: center;\n  "
    ],
    medium: [
        "\n    font-size: 1.4rem;\n    padding: 1.2rem 1.6rem;\n    font-weight: 500;\n  "
    ],
    large: [
        "\n    font-size: 1.6rem;\n    padding: 1.2rem 2.4rem;\n    font-weight: 500;\n  "
    ]
}


const Button1 = styled.button`
  border: none;
  ${props => sizes[props.size]}
  cursor: pointer;
`;

//converted to:
const Button2 = styled.button(["border: none;\n", "cursor: pointer;"], props => sizes[props.size]);

// Rough picture of what styled.button does internally:
function styledButton(templateStrings, ...interpolations) {
  // templateStrings = ["border: none;\n", "cursor: pointer;"]
  // interpolations = [props => sizes[props.size]]
  
  // Store the template and functions for later
  const storedTemplate = {
    strings: templateStrings,
    functions: interpolations
  };
  
  // Return a React component function
  return function(props) {
    // props comes from React: { size: "medium", variation: "primary", children: "Check in" }
    
    // Call stored functions with props to get CSS objects
    const cssObjects = storedTemplate.functions.map(fn => fn(props));
    // cssObjects[0] = sizes["medium"] = CSS object
    
    // Extract CSS strings from objects and combine with template
    // NOTE: combineCSS, generateClassName, injectCSS are PLACEHOLDER functions
    // They represent what styled-components does internally (not real functions)
    const finalCSS = combineCSS(templateStrings, cssObjects);
    // finalCSS = "border: none; font-size: 1.4rem; padding: 1.2rem 1.6rem; cursor: pointer;"
    
    // styled-components internally:
    // 1. Generates unique class name (like "sc-abc123") based on CSS hash
    const className = generateClassName(finalCSS); // Placeholder - not a real function
    // className = "sc-abc123"
    
    // 2. Injects CSS into <style> tag in document head
    injectCSS(className, finalCSS); // Placeholder - not a real function
    // Creates: <style>.sc-abc123 { border: none; ... }</style>
    
    // Return JSX with the generated class name
    return <button className={className} {...props}>{props.children}</button>;
  };
}

<Button size="medium" variation="primary">Check in</Button>
//above jxs is converted to this:
Button({size: "medium", variation: "primary"})

*/