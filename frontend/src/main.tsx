import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';
import i18next from "i18next";
import {createTheme, MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import {i18nInitializer} from "./Utils";
import {ThemeProvider} from "./Providers/ThemeProvider.tsx";
import {CookiesPopup} from "./Features/shared/components/CookiesPopup";
import {AlertProvider} from "./Providers/AlertProvider.tsx";
import {ModalsProvider} from "@mantine/modals";

i18nInitializer();

const theme = createTheme({
  colors: {
    // TODO: Migrate colors
  },
  fontFamily: 'Lato, sans-serif',
});

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme} defaultColorScheme={'dark'}>
    <I18nextProvider i18n={i18next}>
      <AlertProvider>
        <BrowserRouter>
          <ModalsProvider>
            <ThemeProvider>
              <CookiesPopup/>
              <App/>
            </ThemeProvider>
          </ModalsProvider>
        </BrowserRouter>
      </AlertProvider>
    </I18nextProvider>
  </MantineProvider>
)
