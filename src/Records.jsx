import './App.css'

import RecordsTable from './RecordsTable';

const DHTID_LEFT = 0;
const DHTID_RIGHT = 1;

function Records() {
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
						<RecordsTable dhtid={DHTID_LEFT} />
					</div>
				</div>
				<div className='grow'>
					<div className='card-unimportant card-title'>
						<p>DHT Right</p>
					</div>
					<div className='card card-background'>
						<RecordsTable dhtid={DHTID_RIGHT} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Records
