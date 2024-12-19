import { useEffect, useState } from 'react'

import { collection, query, where, getDocs, getFirestore, orderBy, startAfter, endBefore } from "firebase/firestore";

import './App.css'
import RecordsTable from './RecordsTable';

function Records({ app }) {
	const DHTID_LEFT = 0;
	const DHTID_RIGHT = 1;

	return (
		<div className='records'>
			<p className='content-title'>
				Measurement Records
			</p>
			<div className='lg:content'>
				<div className='grow'>
					<div className='card-unimportant card-title'>
						<p>DHT Left</p>
					</div>
					<div className='card card-background'>
						<RecordsTable app={app} dhtid={DHTID_LEFT} />
					</div>
				</div>
				<div className='grow'>
					<div className='card-unimportant card-title'>
						<p>DHT Right</p>
					</div>
					<div className='card card-background'>
						<RecordsTable app={app} dhtid={DHTID_RIGHT} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Records
