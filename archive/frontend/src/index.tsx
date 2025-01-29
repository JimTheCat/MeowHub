import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "./Providers/ThemeProvider";
import {BrowserRouter} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import {i18nInitializer} from "./Services/Utils";
import {createTheme, MantineProvider} from "@mantine/core";

i18nInitializer();

const theme = createTheme({
  colors: {
    // TODO: Migrate colors
  },
  fontFamily: 'Lato, sans-serif',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <MantineProvider theme={theme} defaultColorScheme={'dark'}>
      <ThemeProvider>
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            <App/>
          </I18nextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </MantineProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
