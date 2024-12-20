import { useEffect, useState } from 'react'

import { firestore } from './Firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";

import './App.css'

const Units = {
    TEMPERATURE: "°C",
    HUMIDITY: "%",
}

const Sensors = {
    LEFT: "0",
    RIGHT: "1",
}

function Settings() {
	const [threshold, setThreshold] = useState({
		leftTemperature: '0',
		leftHumidity: '0',
		rightTemperature: '0',
		rightHumidity: '0',
	});

	const getThresholds = async () => {
		const thresholdRef = doc(firestore, "thresholds", "threshold");
		const thresholdSnapshot = await getDoc(thresholdRef);
		setThreshold(thresholdSnapshot.data());
	}

	const handleChange = (e) => {
		setThreshold(prev => ({...prev, [e.target.name]: e.target.value}));
	} 

	const handleSubmit = async (e) => {
		e.preventDefault(); //Don't refresh the page
		const thresholdRef = doc(firestore, "thresholds", "threshold");
		await updateDoc(thresholdRef, {
			leftTemperature: parseFloat(threshold.leftTemperature),
			leftHumidity: parseFloat(threshold.leftHumidity),
			rightTemperature: parseFloat(threshold.rightTemperature),
			rightHumidity: parseFloat(threshold.rightHumidity),
		})
	}

	useEffect(() => {
		getThresholds();
	}, []);

	return (
		<div className='settings'>
			<p className='content-title'>
				Sensor Settings
			</p>
			<div className='lg:content'>
				<form className='grow lg:grow-0 lg:mx-auto' onSubmit={handleSubmit}>
					<div className='card-unimportant card-title'>
						<p>Threshold</p>
					</div>
					<div className='card card-background'>
						<SettingsThreshold 
							sensor={Sensors.LEFT} 
							unit={Units.TEMPERATURE} 
							value={threshold.leftTemperature}
							onChange={handleChange}
						/>
						<SettingsThreshold 
							sensor={Sensors.LEFT} 
							unit={Units.HUMIDITY} 
							value={threshold.leftHumidity}
							onChange={handleChange}
						/>
						<SettingsThreshold 
							sensor={Sensors.RIGHT} 
							unit={Units.TEMPERATURE} 
							value={threshold.rightTemperature}
							onChange={handleChange}
						/>
						<SettingsThreshold 
							sensor={Sensors.RIGHT} 
							unit={Units.HUMIDITY} 
							value={threshold.rightHumidity}
							onChange={handleChange}
						/>
						<div className='w-full'>
							<button className='card card-emphasis block ml-auto bg-yellow-200 focus:bg-green-200'>Save</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

function SettingsThreshold({ sensor, unit, value, onChange }) {
	const getName = () => {
		return (
			(sensor == Sensors.LEFT ? "left" : "right") + 
			(unit == Units.TEMPERATURE ? "Temperature" : "Humidity")
		);
	}

	const getLabel = () => {
		return (
			(sensor == Sensors.LEFT ? "Left" : "Right") + " " +
            (unit == Units.TEMPERATURE ? "Temperature" : "Humidity")
		)
	}

    return (
		<div className='sm:threshold'>
			<label htmlFor={getName()} className='mr-auto my-auto sm:text-xl smcol-span-1'>
				{getLabel()}
			</label>
			<div className='flex sm:col-span-2 my-auto'>
				<input type='number' step="0.1" id={getName()} name={getName()} value={value} 
					className='threshold-units grow w-24 sm:text-right' onChange={onChange} size={0} required/>
				<p className='threshold-units'>
					{unit}
				</p>
			</div>
		</div>
    )
}

export default Settings
