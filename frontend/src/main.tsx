import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import i18next from "i18next";
import {createTheme, MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import {i18nInitializer} from "./Services/Utils";
import {ThemeProvider} from "./Providers/ThemeProvider.tsx";

i18nInitializer();

const theme = createTheme({
  colors: {
    // TODO: Migrate colors
  },
  fontFamily: 'Lato, sans-serif',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme={'dark'}>
      <ThemeProvider>
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            <App/>
          </I18nextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </MantineProvider>
  </StrictMode>,
)
