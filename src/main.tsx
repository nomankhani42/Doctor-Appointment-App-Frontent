import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store ,{persistor} from './Store/index.ts';
import  { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
 
   <Provider store={store}>
        <PersistGate persistor={persistor} >
        <BrowserRouter >
        <Toaster />
        <App />
     </BrowserRouter>
        </PersistGate>
   </Provider>
  ,
)
