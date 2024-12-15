import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import i18next from "i18next";
import {createTheme, MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import {i18nInitializer} from "./Services/Utils";
import {ThemeProvider} from "./Providers/ThemeProvider.tsx";
import {CookiesPopup} from "./Components/CookiesPopup";
import {AlertProvider} from "./Providers/AlertProvider.tsx";

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
      <AlertProvider>
        <ThemeProvider>
          <BrowserRouter>
            <I18nextProvider i18n={i18next}>
              <CookiesPopup/>
              <App/>
            </I18nextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AlertProvider>
    </MantineProvider>
  </StrictMode>,
)
