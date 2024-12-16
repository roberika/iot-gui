import { useState } from 'react'

import { initializeApp } from "firebase/app";

import './App.css'
import LiveMonitoring from './LiveMonitoring'
import Records from './Records'
import Settings from './Settings'

const firebaseConfig = {
  apiKey: "AIzaSyDeJS1-Ucxs8YniV-vS-TB5uDWIEaTCsFg",
  authDomain: "dht-firebase-if51.firebaseapp.com",
  databaseURL: "https://dht-firebase-if51-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dht-firebase-if51",
  storageBucket: "dht-firebase-if51.firebasestorage.app",
  messagingSenderId: "508179112287",
  appId: "1:508179112287:web:eb19dceb481f4bd0db16ea",
  measurementId: "G-VP8SK1EK3L"
};

const app = initializeApp(firebaseConfig);

const Pages = {
  LIVE_MONITORING: {
    "label": "Live Monitoring",
    "page": <LiveMonitoring app={app} />
  },
  RECORDS: {
    "label": "Records",
    "page": <Records app={app} />
  },
  SETTINGS: {
    "label": "Settings",
    "page": <Settings app={app} />
  },
}

function App() {
  const [currentPage, setCurrentPage] = useState(Pages.LIVE_MONITORING)
  const [showTopbar, setShowTopbar] = useState(false)

  return (
    <div className='outer-webpage'>
      {showTopbar ? (
        <Topbar />
      ) : (
        <></>
      )}
      <div className='inner-webpage'>
        <Sidebar items={Pages} onClick={(page) => setCurrentPage(page)} />
        <div className='content'>
          {currentPage.page}
        </div>
      </div>
    </div>
  )
}


function Topbar() {
  return (
    <div className='topbar'>
      <p>IoT Digital Humidity and Temperature Monitoring</p>
    </div>
  )
}

function Sidebar({ items, onClick }) {
  const [status, setStatus] = useState(1)

  return (
    <>
      <div className='sidebar'>
        <a className='no-hover' href='https://console.firebase.google.com/u/0/project/dht-firebase-if51/'>
          {(status ? (
            <div className='sidebar-title'>
              <span className='dot dot-online'></span>
              <span>Online</span>
            </div>
          ) : (
            <div className='sidebar-title'>
              <span className='dot dot-offline'></span>
              <span>Offline</span>
            </div>
          ))}
        </a>
        {Object.keys(items).map((key, index) => {
          return <SidebarItem item={items[key]} onClick={() => onClick(items[key])} />
        })}
      </div>
    </>
  )
}

function SidebarItem({ item, onClick }) {
  return (
    <>
      <div className='sidebar-item' onClick={() => onClick()}>
        <p>{item.label}</p>
      </div>
    </>
  )
}

export default App
