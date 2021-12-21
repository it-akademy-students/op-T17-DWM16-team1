import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
    const [chartData, setChartData] = useState<any>()
    const uid = window.localStorage.getItem('uid')

    console.log(uid)

    const fetchData = async( ) => {
        const result = await axios.post('http://localhost:9000/chart', {uid})
        setChartData(result.data)
    }
    useEffect(() =>{
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const data = {
        labels: ['Household', 'Food', 'Other'],
        datasets: [
          {
            label: '# of Votes',
            data: [chartData.household, chartData.food, chartData.other],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
      
    console.log(chartData)
    return(
        <Doughnut data={data}/>  
    )
}