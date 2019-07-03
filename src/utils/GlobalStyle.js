import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-white: rgb(244, 244, 244);
    --color-gray: rgb(67, 67, 67);
    --color-green: rgb(4, 142, 0);
    --color-darkgray: rgb(47, 47, 47);
    --color-red: rgb(224, 6, 6);
    --color-blue: rgb(32, 48, 64);
    --color-black: rgb(12, 12, 12);
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
    user-select: none;
  }

  body {
    height: 100vh;
    font-family: Arial;
    font-size: 10px;
    background-color: var(--color-gray);
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: var(--color-black);
}
::-moz-placeholder { /* Firefox 19+ */
  color: var(--color-black);
}
:-ms-input-placeholder { /* IE 10+ */
  color: var(--color-black);
}
:-moz-placeholder { /* Firefox 18- */
  color: var(--color-black);
}
`;
