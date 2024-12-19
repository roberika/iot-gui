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
      <div className='content'>
        <div>
          <div className='card card-background'>
            <p>DHT Left</p>
          </div>
          <div className='card card-background'>
            <RecordsTable app={app} dhtid={DHTID_LEFT} />
          </div>
        </div>
        <div>
          <div className='card card-background'>
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
