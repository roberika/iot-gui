import { useEffect, useState } from 'react'

import { firestore } from './Firebase';
import { collection, query, where, getDocs, orderBy, getCountFromServer, limit, startAfter, endBefore, limitToLast, startAt, endAt } from "firebase/firestore";

import './App.css'

import RefreshIcon from './assets/refresh-icon.svg'
import PrevIcon from './assets/prev-icon.svg'
import NextIcon from './assets/next-icon.svg'

function RecordsTable({ dhtid }) {
    const RECORDS_PER_PAGE = 10;

    const getToday = () => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    }

    const getYesterday = () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().slice(0, 10);
    }

    const [records, setRecords] = useState(null);
    const [recordsCount, setRecordsCount] = useState(0);
    const [page, setPage] = useState(0);
    const [startDate, setStartDate] = useState(getYesterday())
    const [endDate, setEndDate] = useState(getToday())

    const loadData = async (cursor = null, forward = true, page = 0) => {
        const countSnapshot = await getCountFromServer(query(
            collection(firestore, "records"),
            where("dhtid", "==", dhtid),
            where("timestamp", ">=", getSeconds(startDate, false)),
            where("timestamp", "<=", getSeconds(endDate, true)),
        ));
        setRecordsCount(countSnapshot.data().count);

        let querySnapshot;
        if (page == 0) {
            querySnapshot = await getDocs(query(
                collection(firestore, "records"),
                where("dhtid", "==", dhtid),
                where("timestamp", ">=", getSeconds(startDate, false)),
                where("timestamp", "<=", getSeconds(endDate, true)),
                orderBy("timestamp", "desc"),
                limit(RECORDS_PER_PAGE)
            ));
        } else if (forward) {
            querySnapshot = await getDocs(query(
                collection(firestore, "records"),
                where("dhtid", "==", dhtid),
                where("timestamp", ">=", getSeconds(startDate, false)),
                where("timestamp", "<=", getSeconds(endDate, true)),
                orderBy("timestamp", "desc"),
                startAfter(cursor),
                limit(RECORDS_PER_PAGE)
            ));
        } else {
            querySnapshot = await getDocs(query(
                collection(firestore, "records"),
                where("dhtid", "==", dhtid),
                where("timestamp", ">=", getSeconds(startDate, false)),
                where("timestamp", "<=", getSeconds(endDate, true)),
                orderBy("timestamp", "desc"),
                endBefore(cursor),
                limitToLast(RECORDS_PER_PAGE)
            ));
        }
        setRecords(querySnapshot);
    }

    const nextPage = () => {
        loadData(records.docs[records.docs.length - 1], true, page + 1);
        setPage(page + 1);
    }

    const prevPage = () => {
        loadData(records.docs[0], false, page - 1);
        setPage(page - 1);
    }

    const getRecords = () => {
        return !records ? [] : records.docs.map((doc, _) => doc.data())
    }

    const getSeconds = (dateString, end = false) => {
        const millis = Math.floor(Date.parse(dateString)) + (end ? 86399999 : 0);
        return new Date(millis);
    }

    useEffect(() => {
        loadData();
    }, [startDate, endDate]);

    const timestampOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    }

    return (
        <div className='records-table'>
            <div className='card card-emphasis bg-slate-200'>
                <div className='flex flex-col sm:flex-row'>
                    <input value={startDate} className='records-table-date' type='date' onChange={(e) => {setStartDate(e.target.value)}}></input>
                    <p className='grow hidden sm:block'>-</p>
                    <hr className='bg-slate-300 h-0.5'/>
                    <input value={endDate} className='records-table-date' type='date' onChange={(e) => {setEndDate(e.target.value)}}></input>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className='hidden sm:table-cell'>No.</th>
                        <th>Waktu Pencatatan</th>
                        <th>Suhu</th>
                        <th>Kelembapan</th>
                    </tr>
                </thead>
                <tbody>
                    {getRecords().map((record, index) => {
                        return <tr key={index}>
                            <td className='hidden sm:table-cell'>{index + (page * RECORDS_PER_PAGE) + 1}</td>
                            <td>{record.timestamp.toDate().toLocaleDateString("en-GB", timestampOptions)}</td>
                            <td>{record.temperature}</td>
                            <td>{record.humidity}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className='flex px-4 pt-2'>
                <div className='flex-shrink pr-4 py-2 hidden sm:block'>
                    {`Jumlah data: ${recordsCount}`}
                </div>
                <button className='records-table-button' type='button' onClick={() => loadData(null, false)}>
                    <img src={RefreshIcon} />
                </button>
                <div className='flex-grow' />
                {page > 0 ? (
                    <button className='records-table-button' type='button' onClick={prevPage}><img src={PrevIcon} /></button>
                ) : (
                    <button className='records-table-button' type='button' disabled><img className='invisible' src={PrevIcon} /></button>
                )}

                {(page + 1) * RECORDS_PER_PAGE < recordsCount ? (
                    <button className='records-table-button' type='button' onClick={nextPage}><img src={NextIcon} /></button>
                ) : (
                    <button className='records-table-button' type='button' disabled><img className='invisible' src={NextIcon} /></button>
                )}
            </div>
        </div>
    )
}

export default RecordsTable