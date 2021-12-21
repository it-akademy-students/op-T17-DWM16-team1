import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios'
import MiniDrawer from '../../layout/appbar';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

ChartJS.register(ArcElement, Tooltip, Legend);

export const Landing = () => {
    const [chartData, setChartData] = useState<any>()
    const [user, setUser] = useState<any>()
    const uid = window.localStorage.getItem('uid')

    console.log(uid)

    const fetchData = async( ) => {
        const result = await axios.post('http://localhost:9000/chart', {uid})
        const res = await axios.post('http://localhost:9000/transactions', {uid})
        setChartData(result.data)
        setUser(res.data)
    }
    useEffect(() =>{
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(chartData)
    console.log(user)
    const data = {
        labels: ['Household', 'Food', 'Other'],
        datasets: [
          {
            label: '# of Votes',
            data: [1,5,3],
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
    if(!chartData){
        return(
            <h1>LOADING....</h1>
        )
    }else {
        return(
            <>
            <MiniDrawer/>
            <div style={{height:'80vh', display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center',width:'100%'}}>
                    <div>
                    <Pie data={data}/>
                    </div>
                    <div>
                    <Doughnut data={data}/>
                    </div>
                    <div>
                    <Doughnut data={data}/>
                    </div>
                </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',height:'100%', width:'100%'}}>
                    <Paper elevation={10} style={{height:'100%', width:'80%', display:'flex', flexWrap:'wrap',justifyContent:'center', borderTopLeftRadius:'25px', borderTopRightRadius:'25px'}}>
                        <div style={{width:"100%", height:'20%',display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Typography variant='h6' color='green' style={{marginLeft:'55px'}}>Transactions</Typography>
                            <TextField id="standard-basic" label="Search by name..." variant="standard" style={{marginRight:'10px', marginBottom:'30px'}}/>                            
                        </div>
                        <div style={{width:"100%", height:'100%',display:'flex', flexDirection:'column', alignItems:'center' ,marginTop:'20px'}}>
                            <div style={{width:"90%", height:'10%',display:'flex' ,flexDirection:'column',marginTop:'20px', marginBottom:'20px'}}>
                                <div style={{display:'flex'}}>
                                <Typography style={{ width:'15%'}}>Date</Typography>
                                <Typography style={{ width:'35%', color:'#9B9B9B'}}>Name</Typography>
                                <Typography style={{ width:'10%', color:'#9B9B9B'}}>Amount</Typography>
                                <Typography style={{ width:'15%', color:'#9B9B9B'}}>Category</Typography>
                                <Typography style={{ width:'30%', color:'#9B9B9B'}}>Note</Typography>
                                </div>
                            <div style={{width:'100%', height:'1px', backgroundColor:'black', alignSelf:'center'}}></div>
                            </div>
                        {user.map((item: { name: string, date: string, amount:number, category: [string] }, index: number) => 
                            <div key={index} style={{width:"90%", height:'10%',display:'flex', flexDirection:'column',marginTop:'20px', marginBottom:'5px'}}>
                                    <div style={{display:'flex'}}>
                            <Typography style={{ width:'15%', fontWeight:'inherit',fontFamily:'OpenSans', fontSize:'14px'}}>{item.date}</Typography>
                            <Typography style={{ width:'35%',fontFamily:'OpenSans', fontSize:'14px'}}>{item.name}</Typography>
                            <Typography style={{ width:'10%', color:'#F95959', fontFamily:'OpenSans', fontSize:'14px'}}>{item.amount} $</Typography>
                            <Typography style={{ width:'15%',fontFamily:'OpenSans', fontSize:'14px'}}>{item.category}</Typography>
                            <Typography style={{ width:'30%',fontFamily:'OpenSans', fontSize:'14px'}}>Note</Typography>
                                    </div>
                            <div style={{width:'100%', height:'1px', backgroundColor:'black', alignSelf:'center'}}></div>
                            </div>
                            )}
                        </div>
                    </Paper>
            </div>
            </>
        )
    }
}