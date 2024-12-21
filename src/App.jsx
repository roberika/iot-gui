import { useState } from 'react'
import './App.css'

import LiveMonitoring from './LiveMonitoring'
import Records from './Records'
import Settings from './Settings'

import LiveMonitoringIcon from './assets/live-monitoring-icon.svg';
import RecordsIcon from './assets/records-icon.svg';
import SettingsIcon from './assets/settings-icon.svg';

const Pages = {
	LIVE_MONITORING: {
		"label": "Live Monitoring",
		"page": <LiveMonitoring />,
		"icon": <img src={LiveMonitoringIcon} />
	},
	RECORDS: {
		"label": "Records",
		"page": <Records />,
		"icon": <img src={RecordsIcon} />
	},
	SETTINGS: {
		"label": "Settings",
		"page": <Settings />,
		"icon": <img src={SettingsIcon} />
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
				<div className='content-page'>
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
				<a className='no-hover block mx-auto' href='https://console.firebase.google.com/u/0/project/dht-firebase-if51/'>
					<SidebarStatus status={status} />
				</a>
				{Object.keys(items).map((key, index) => {
					return <SidebarItem key={index} item={items[key]} onClick={() => onClick(items[key])} />
				})}
			</div>
		</>
	)
}

function SidebarStatus({ status }) {
	return <>
		{(status ? (
			<div className='sidebar-status'>
				<span className='dot dot-online md:mr-3'></span>
				<span className='hidden md:inline'>Online</span>
			</div>
		) : (
			<div className='sidebar-status'>
				<span className='dot dot-offline md:mr-3'></span>
				<span className='hidden md:inline'>Offline</span>
			</div>
		))}
	</>
}

function SidebarItem({ item, onClick }) {
	return (
		<>
			<div className='sidebar-item md:block hidden' onClick={() => onClick()}>
				<p>{item.label}</p>
			</div>
			<div className='sidebar-item block md:hidden' onClick={() => onClick()}>
				{item.icon}
			</div>
		</>
	)
}

export default App
