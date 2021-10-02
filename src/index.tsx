import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';
import locale_en from './translations/en.json';
import locale_es from './translations/es.json';

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
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
