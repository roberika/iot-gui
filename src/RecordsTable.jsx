import { useEffect, useState } from 'react'

import { collection, query, where, getDocs, getFirestore, orderBy, getCountFromServer, limit, startAfter, endBefore, limitToLast } from "firebase/firestore";

import './App.css'

function RecordsTable({ app, dhtid }) {
    const RECORDS_PER_PAGE = 10;

    const [records, setRecords] = useState(null);
    const [recordsCount, setRecordsCount] = useState(0);
    const [page, setPage] = useState(0);

    const loadData = async (cursor = null, forward = true, page = 0) => {
        const db = getFirestore(app);

        const countSnapshot = await getCountFromServer(query(
            collection(db, "records"),
            where("dhtid", "==", dhtid)
        ));
        setRecordsCount(countSnapshot.data().count);

        let querySnapshot;
        if (page == 0) {
            querySnapshot = await getDocs(query(
                collection(db, "records"),
                where("dhtid", "==", dhtid),
                orderBy("timestamp", "desc"),
                limit(RECORDS_PER_PAGE)
            ));
        } else if (forward) {
            querySnapshot = await getDocs(query(
                collection(db, "records"),  
                where("dhtid", "==", dhtid),
                orderBy("timestamp", "desc"),
                startAfter(cursor),
                limit(RECORDS_PER_PAGE)
            ));
        } else {
            querySnapshot = await getDocs(query(
                collection(db, "records"),
                where("dhtid", "==", dhtid),
                orderBy("timestamp", "desc"),
                endBefore(cursor),
                limitToLast(RECORDS_PER_PAGE)
            ));
        }
        setRecords(querySnapshot);
    }

    const nextPage = () => {
        loadData(records.docs[records.docs.length-1], true, page + 1);
        setPage(page + 1);
    }
    
    const prevPage = () => {
        loadData(records.docs[0], false, page - 1);
        setPage(page - 1);
    }

    const getRecords = () => {
        return !records ? [] : records.docs.map((doc, _) => doc.data())
    }

    useEffect(() => {
        loadData();
    }, []);

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
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Waktu Pencatatan</th>
                        <th>Suhu</th>
                        <th>Kelembapan</th>
                    </tr>
                </thead>
                <tbody>
                    {getRecords().map((record, index) => {
                        return <tr key={index}>
                            <td>{index + (page * RECORDS_PER_PAGE) + 1}</td>
                            <td>{record.timestamp.toDate().toLocaleDateString("en-GB", timestampOptions)}</td>
                            <td>{record.temperature}</td>
                            <td>{record.humidity}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div>
                <div>
                    <button type='button' onClick={() => loadData(null, false)}>Refresh</button>
                    <div>
                        {`Jumlah data: ${recordsCount}`}
                    </div>
                </div>
                <div>
                    {page > 0 ? (
                        <button type='button' onClick={prevPage}>Prev</button>
                    ) : (
                        <button type='button' disabled>Prev</button>
                    )}

                    {(page + 1) * RECORDS_PER_PAGE < recordsCount ? (
                        <button type='button' onClick={nextPage}>Next</button>
                    ) : (
                        <button type='button' disabled>Next</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecordsTable
