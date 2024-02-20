import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './redux/configStore'
import { setHeaderAuth } from './axios/axiosClient'
import { getLocalStorage } from 'utils/utils'
import { StorageKeys } from 'constants/storageKeys'

const access_token = getLocalStorage(StorageKeys.ACCESS_TOKEN)

setHeaderAuth(access_token)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

reportWebVitals()
