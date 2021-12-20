import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export const Test = () => {
    const location = useLocation()
    const {uid} = location.state
    const [user, setUser] = useState<any>()

    const fetchData = async () => {
        const result = await axios.post('http://localhost:9000/transactions', {uid
    })
        setUser(result.data)
    }

    useEffect(() => {
        fetchData()
    }, [])
    console.log(user)
    if(user){
        return(
            <div>
                {user.map((item: { name: string, date: string, amount:number, category: [string] }, index: number) => 
                <div>
                <p key={index}>{item.date}</p>
                <p key={index}>{item.name}</p>
                <p key={index}>{item.amount}</p>
                <p key={index}>{item.category[0]}</p>
                </div>
                )}
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}