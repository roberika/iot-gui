import { useEffect, useState } from 'react'

import { collection, query, where, getDocs, getFirestore, orderBy, getCountFromServer, startAt, limit } from "firebase/firestore";

import './App.css'

function RecordsTable({ app, dhtid }) {
    const RECORDS_PER_PAGE = 30;

    const [records, setRecords] = useState([]);
    const [recordsCount, setRecordsCount] = useState(0);
    const [page, setPage] = useState(0);

    const loadData = async () => {
        const db = getFirestore(app);

        const countSnapshot = await getCountFromServer(query(
            collection(db, "records"),
            where("dhtid", "==", dhtid)
        ));
        setRecordsCount(countSnapshot.data().count);

        const querySnapshot = query(
            collection(db, "records"),
            where("dhtid", "==", dhtid),
            orderBy("timestamp", "desc"),
            startAt(page * RECORDS_PER_PAGE),
            limit(RECORDS_PER_PAGE)
        );

        const documents = await getDocs(querySnapshot);
        setRecords(documents.map((doc) => doc.data()));
    }

    useEffect(() => {
        loadData();
    }, [page]);

    return (
        <div>
            <table className=''>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Waktu Pencatatan</th>
                        <th>Suhu</th>
                        <th>Kelembapan</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => {
                        return <tr>
                            <td>{index + (page * RECORDS_PER_PAGE) + 1}</td>
                            <td>{record.timestamp}</td>
                            <td>{record.temperature}</td>
                            <td>{record.humidity}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div>
                <div>
                    <button type='button' onClick={loadData}>Refresh</button>
                    <div>
                        {`Jumlah data: ${recordsCount}`}
                    </div>
                </div>
                <div>
                    {page > 0 ? (
                        <button type='button' onClick={() => setPage(page - 1)}>Prev</button>
                    ) : (
                        <button type='button' disabled>Prev</button>
                    )}

                    {(page + 1) * RECORDS_PER_PAGE < recordsCount ? (
                        <button type='button' onClick={() => setPage(page + 1)}>Next</button>
                    ) : (
                        <button type='button' disabled>Next</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecordsTable
