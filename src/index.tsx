import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { store, persistor } from './redux/store';
import { AppContextProvider } from './AppContextProvider';
import locale_en from './translations/en.json';
import locale_es from './translations/es.json';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';


const locales: Record<string, Record<string, string>> = {
  en: locale_en as unknown as Record<string, string>,
  es: locale_es as unknown as Record<string, string>
};

let language = navigator.language.split(/[-_]/)[0];
if (Object.keys(locales).indexOf(language) == -1) {
  //fallback to english if we dont support their language
  console.log(`locale information not found for ${language}, falling back to 'en'.`);
  language = 'en';
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IntlProvider locale={language} messages={locales[language]}>
          <AppContextProvider>
            <Router>
              <App />
            </Router>
          </AppContextProvider>
        </IntlProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
