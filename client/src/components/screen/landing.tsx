import { useState, useEffect } from 'react'
import axios from 'axios'

export const Landing = () => {
    const [data, setData] = useState<any>()
    const uid = window.localStorage.getItem('uid')

    console.log(uid)

    const fetchData = async( ) => {
        const result = await axios.post('http://localhost:9000/chart', {uid})
        setData(result.data)
    }
    useEffect(() =>{
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(data)
    return(
        <>
        sssss
        </>
    )
}