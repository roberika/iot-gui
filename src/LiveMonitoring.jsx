import { useEffect, useState } from 'react'

import { firestore, realtime } from './Firebase';
import { doc, getDoc} from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

import './App.css'

import LiveChart from './LiveChart';

const Units = {
    TEMPERATURE: "°C",
    HUMIDITY: "%",
}

const DHTID_LEFT = 0;
const DHTID_RIGHT = 1;

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
                            <LiveChart dhtid={DHTID_LEFT} />
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
                            <LiveChart dhtid={DHTID_RIGHT} />
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

export default LiveMonitoring
