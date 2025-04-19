import { createGlobalStyle } from 'styled-components';
import { animations } from './theme';

const GlobalStyles = createGlobalStyle`
  ${animations.keyframes.float}
  ${animations.keyframes.pulse}
  ${animations.keyframes.fadeIn}
  ${animations.keyframes.typing}
  ${animations.keyframes.blink}
  ${animations.keyframes.dataFlow}
  ${animations.keyframes.serverPulse}

  * {
    box-sizing: border-box;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: background-color 0.4s, color 0.4s;
  }
  
  p {
    color: ${props => props.theme.textSecondary};
    line-height: 1.6;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.text};
  }
  
  a {
    color: ${props => props.theme.primary};
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  
  /* Custom scrollbar for dark mode */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.body};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.primaryDark};
  }
`;

export default GlobalStyles;