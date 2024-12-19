import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

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
export const realtime = getDatabase(app);
export const firestore = getFirestore(app);