import { useEffect, useState } from 'react'

import { firestore } from './Firebase';
import {
    collection, getDocs, limit,
    orderBy, query, where
} from 'firebase/firestore';
import {
    CartesianGrid, Legend, Line, LineChart,
    ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

import './App.css'

const Units = {
    TEMPERATURE: "°C",
    HUMIDITY: "%",
}
const RECORDS_PER_PAGE = 61;

function LiveChart({ dhtid }) {

    const getDate = (timestamp) => {
        return timestamp.toDate().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    const getTime = (timestamp) => {
        return timestamp.toDate().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }

    const [records, setRecords] = useState(null);

    const loadData = async () => {
        const querySnapshot = await getDocs(query(
            collection(firestore, "records"),
            where("dhtid", "==", dhtid),
            orderBy("timestamp", "desc"),
            limit(RECORDS_PER_PAGE)
        ));
        setRecords(querySnapshot);
    }

    const getData = () => {
        const data = !records ? [] : records.docs.map((doc, index) => {
            if (index % 6 == 0) return {
                "dht": dhtid == 0 ? "Left" : "Right",
                "humidity": doc.data().humidity,
                "temperature": doc.data().temperature,
                "date": getDate(doc.data().timestamp),
                "time": getTime(doc.data().timestamp),
            }
            return null;
        }).filter((e) => e != null);
        return data.reverse();
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <ResponsiveContainer width="99%" height={200} className="mx-auto">
            <LineChart data={getData()} syncId={"dht-records"}
                margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis width={20} />
                <Tooltip />
                <Legend />
                <Line name="DHT" type="monotone" dataKey="dht"
                    stroke="#724892" legendType='none' hide='true' />
                <Line name="Date" type="monotone" dataKey="date"
                    stroke="#d66884" legendType='none' hide='true' />
                <Line name="Humidity" type="monotone"
                    dataKey="humidity" stroke="#8884d8"
                    unit={Units.HUMIDITY} />
                <Line name="Temperature" type="monotone"
                    dataKey="temperature" stroke="#82ca9d"
                    unit={Units.TEMPERATURE} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LiveChart