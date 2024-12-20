import { useEffect, useState } from 'react'

import { firestore, realtime } from './Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

import './App.css'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Units = {
    TEMPERATURE: "°C",
    HUMIDITY: "%",
}

function LiveMonitoring() {
    const [leftDanger, setLeftDanger] = useState(false);
    const [rightDanger, setRightDanger] = useState(false);
    const [leftTemperature, setLeftemperature] = useState(0);
    const [leftHumidity, setLeftHumidity] = useState(0);
    const [rightTemperature, setRightTemperature] = useState(0);
    const [rightHumidity, setRightHumidity] = useState(0);

    const setDanger = async (
        leftTemperature,
        leftHumidity,
        rightTemperature,
        rightHumidity
    ) => {
        const thresholdRef = doc(firestore, "thresholds", "threshold");
        const thresholdSnapshot = await getDoc(thresholdRef);
        const threshold = thresholdSnapshot.data();

        setLeftDanger(
            (threshold.leftTemperature <= leftTemperature) && 
            (threshold.leftHumidity <= leftHumidity)
        );
        setRightDanger(
            (threshold.rightTemperature <= rightTemperature) && 
            (threshold.rightHumidity <= rightHumidity)
        );
    }

    const getDangerSide = () => {
        if (leftDanger && rightDanger) {
            return "Both"
        }
        if (leftDanger) {
            return "Left"
        }
        if (rightDanger) {
            return "Right"
        }
        return "Safe"
    }

    useEffect(() => {
        const liveRef = ref(realtime);
        onValue(liveRef, (snapshot) => {
            const newVal = snapshot.val()
            const leftTemperature = newVal.leftTemperature;
            const leftHumidity = newVal.leftHumidity;
            const rightTemperature = newVal.rightTemperature;
            const rightHumidity = newVal.rightHumidity;
            setLeftemperature(leftTemperature);
            setLeftHumidity(leftHumidity);
            setRightTemperature(rightTemperature);
            setRightHumidity(rightHumidity);
            setDanger(
                leftTemperature, leftHumidity, 
                rightTemperature, rightHumidity
            );
        });
    }, [])

    return (
        <div className='live-monitoring'>
            <p className='content-title'>
                Live Sensor Monitoring
            </p>
            <div className={'card card-background live-measure-status ' + 
                ((leftDanger || rightDanger) ? "live-measure-danger" : "live-measure-safe")}>
                {getDangerSide()}
            </div>
            <div className='lg:content'>
                <div className='grow'>
                    <div className='card-unimportant card-title'>
                        <p>DHT Left</p>
                    </div>
                    <div className='card card-background'>
                        <div className='live-measure-row'>
                            <LiveChart dhtid={0} />
                            <LiveMonitor value={leftDanger} />
                            <LiveMeasure unit={Units.TEMPERATURE} value={leftTemperature} />
                            <LiveMeasure unit={Units.HUMIDITY} value={leftHumidity} />
                        </div>
                    </div>
                </div>
                <div className='grow'>
                    <div className='card-unimportant card-title'>
                        <p>DHT Right</p>
                    </div>
                    <div className='card card-background'>
                        <div className='live-measure-row'>
                            <LiveChart dhtid={1} />
                            <LiveMonitor value={rightDanger} />
                            <LiveMeasure unit={Units.TEMPERATURE} value={rightTemperature} />
                            <LiveMeasure unit={Units.HUMIDITY} value={rightHumidity} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LiveMonitor({ value }) {
    return (
        <p className={'live-measure-status ' + 
            (value ? "live-measure-danger" : "live-measure-safe")}>
            {value ? "Danger" : "Safe"}
        </p>
    )
}

function LiveMeasure({ unit, value }) {
    return (
        <div className='sm:live-measure'>
            <p className='ml-auto my-auto sm:text-xl'>
                {unit == Units.TEMPERATURE ? "Temperature" : "Humidity"}
            </p>
            <p className='live-measure-units min-w-24'>
                {value + unit}
            </p>
        </div>
    )
}

function LiveChart({ dhtid }) {
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }
      ]

    return (
        <ResponsiveContainer width="99%" height={200} className="mx-auto">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" unit={Units.TEMPERATURE} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" unit={Units.HUMIDITY} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LiveMonitoring
