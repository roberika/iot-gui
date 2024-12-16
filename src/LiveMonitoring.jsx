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
            <div className='flex flex-row'>
                <div>
                    <div className='card card-background'>
                        <p>DHT Left</p>
                    </div>
                    <div className='card card-background'>
                        <div className='flex flex-row'>
                            <LiveMeasure unit={Units.TEMPERATURE} value={33} />
                            <LiveMeasure unit={Units.HUMIDITY} value={33} />
                        </div>
                        <p>Create React App does not support custom PostCSS configurations and is incompatible with many important tools in the PostCSS ecosystem, like `postcss-import`. We highly recommend using Vite, Parcel, Next.js, or Remix instead of Create React App. They provide an equivalent or better developer experience but with more flexibility, giving you more control over how Tailwind and PostCSS are configured.</p>
                    </div>
                </div>
                <div>
                    <div className='card card-background'>
                        <p>DHT Right</p>
                    </div>
                    <div className='card card-background'>
                        <div className='flex flex-row'>
                            <LiveMeasure unit={Units.TEMPERATURE} value={25} />
                            <LiveMeasure unit={Units.HUMIDITY} value={25} />
                        </div>
                        <p>Create React App does not support custom PostCSS configurations and is incompatible with many important tools in the PostCSS ecosystem, like `postcss-import`. We highly recommend using Vite, Parcel, Next.js, or Remix instead of Create React App. They provide an equivalent or better developer experience but with more flexibility, giving you more control over how Tailwind and PostCSS are configured.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LiveMeasure({ unit, value }) {
    return (
        <div className='grid grid-cols-2 basis-1/2'>
            <p className='ml-auto my-auto'>
                {unit == Units.TEMPERATURE ? "Temperature" : "Humidity"}
            </p>
            <p className='card card-emphasis live-measure'>
                {value + unit}
            </p>
        </div>
    )
}

export default LiveMonitoring
