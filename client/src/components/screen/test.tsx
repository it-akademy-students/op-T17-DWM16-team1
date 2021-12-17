import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export const Test = () => {
    const location = useLocation()
    const {uid} = location.state
    const [query, setQuery] = useState('react')
    const [user, setUser] = useState()

    const fetchData = async () => {
        const result = await axios.post('http://localhost:9000/transactions', {uid
    })
        setUser(result.data)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return(
        <div>
            
        </div>
    )
}