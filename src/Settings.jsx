import { useState } from 'react'

import { doc, getDoc, getFirestore } from "firebase/firestore";

import './App.css'

function Settings() {
  const getThresholds = async () => {
    const docRef = doc(db, "thresholds", "threshold");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <div className='settings'>
      <p>Change things</p>
    </div>
  )
}

export default Settings
