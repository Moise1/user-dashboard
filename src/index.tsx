import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { IntlProvider } from 'react-intl';
import locale_en from './translations/en.json';
import locale_es from './translations/es.json';
import { ThemeSelector } from './components/helpers/ThemeSelector';

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
    <IntlProvider locale={language} messages={locales[language]}>
      <Router>
        <ThemeSelector>
          <App />
        </ThemeSelector>
      </Router>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
