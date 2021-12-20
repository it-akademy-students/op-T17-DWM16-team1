import { useState, useEffect } from 'react'
import axios from 'axios'

export const Test = () => {
    const uid = window.localStorage.getItem('uid')
    console.log(uid)
    const [user, setUser] = useState<any>()

    const fetchData = async () => {
        const result = await axios.post('http://localhost:9000/transactions', {uid
    })
        setUser(result.data)
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(user)
    if(user){
        return(
            <div>
                {user.map((item: { name: string, date: string, amount:number, category: [string] }, index: number) => 
                <div key={index}>
                <p>{item.date}</p>
                <p>{item.name}</p>
                <p>{item.amount}</p>
                <p>{item.category}</p>
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