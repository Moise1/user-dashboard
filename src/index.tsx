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
import moment from 'moment';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';
import 'mini-alert/miniAlert.css';
import 'suneditor/dist/css/suneditor.min.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import en_US from 'antd/es/locale/en_US';
import en_GB from 'antd/es/locale/en_GB';
import es_ES from 'antd/es/locale/es_ES';
import 'moment/locale/es';
import 'moment/locale/en-gb';
import { ConfigProvider } from 'antd';

const locales: Record<string, Record<string, string>> = {
  en: locale_en as unknown as Record<string, string>,
  es: locale_es as unknown as Record<string, string>
};

moment.locale(navigator.language);
const lgParts = navigator.language?.toLowerCase()?.split(/[-_]/);
let language = lgParts[0];
if (Object.keys(locales).indexOf(language) == -1) {
  language = 'en';
}
const locale = (() => {
  switch (language) {
    default: return en_GB;
    case 'en':
      switch (lgParts[1]) {
        default: return en_GB;
        case 'us': return en_US;
      }
    case 'es': return es_ES;
  }
})();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <IntlProvider locale={language} messages={locales[language]}>
        <ConfigProvider locale={locale}>{/*Antd config provider*/}
          <AppContextProvider>
            <Router>
              <App />
            </Router>
          </AppContextProvider>
        </ConfigProvider>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
