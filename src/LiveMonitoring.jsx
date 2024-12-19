import { useState } from 'react'

import { getDatabase } from "firebase/database";

import './App.css'

const Units = {
    TEMPERATURE: "°C",
    HUMIDITY: "%",
}

function LiveMonitoring({ app }) {
    return (
        <div className='live-monitoring'>
            <p className='content-title'>
                Live Sensor Monitoring
            </p>
            <div className='md:content'>
                <div className='grow'>
                    <div className='card-unimportant card-title'>
                        <p>DHT Left</p>
                    </div>
                    <div className='card card-background'>
                        <div className='live-measure-row'>
                            <LiveMeasure unit={Units.TEMPERATURE} value={33} />
                            <LiveMeasure unit={Units.HUMIDITY} value={33} />
                        </div>
                    </div>
                </div>
                <div className='grow'>
                    <div className='card-unimportant card-title'>
                        <p>DHT Right</p>
                    </div>
                    <div className='card card-background'>
                        <div className='live-measure-row'>
                            <LiveMeasure unit={Units.TEMPERATURE} value={25} />
                            <LiveMeasure unit={Units.HUMIDITY} value={25} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LiveMeasure({ unit, value }) {
    return (
        <div className='sm:live-measure'>
            <p className='ml-auto my-auto sm:text-xl'>
                {unit == Units.TEMPERATURE ? "Temperature" : "Humidity"}
            </p>
            <p className='live-measure-units'>
                {value + unit}
            </p>
        </div>
    )
}

export default LiveMonitoring
