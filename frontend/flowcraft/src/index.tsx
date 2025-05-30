import {createTheme, MantineProvider} from "@mantine/core";
import React from 'react';
import ReactDOM from 'react-dom/client';
import {ParallaxProvider} from "react-scroll-parallax";
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const theme = createTheme({
    primaryColor: 'cyan'
});


root.render(
  <React.StrictMode>
      <ParallaxProvider>
          <MantineProvider theme={theme}>
            <App />
          </MantineProvider>
      </ParallaxProvider>
  </React.StrictMode>
);
