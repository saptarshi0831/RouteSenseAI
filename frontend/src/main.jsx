import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "leaflet/dist/leaflet.css";
import "./utils/fixLeafletIcon";
import { AuthProvider } from "./context/AuthProvider";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

createRoot(document.getElementById('root')).render(

<StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
</StrictMode>,
)
