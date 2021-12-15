import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import  Grid  from '@mui/material/Grid'
import './auth.css'
import '../../index.css'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
export const SignInForm = () => {
    let navigate = useNavigate()
    const defaultValues = {
        email: '',
        password:'',
      };
    const [formValues, setFormValues] = useState(defaultValues)
    const handleInputChange = (e: any) => {
        const { name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        let {email , password } = formValues
        axios.post('http://localhost:9000/register', {email, password})
        .then((result) => {if(result.data.status === 'ok'){
            //everything went fine
            navigate('/')
        }else{
            alert(result.data.error)
        }})
      };

    return(
        <Grid container sx={{ height: '100vh'}}>
            <Grid item xs={false} sm={4} md={7} sx={{}}>
                <Box width='1' height='100vh' sx={{bgcolor:'black'}}></Box>
            </Grid>
            <Grid item xs={12} sm={8} md={5}>
                <Box height='1' sx={{ my:8, mx:4, display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                    <Box height='10%' sx={{display:'flex', flexDirection:'column', width:'1'}}> 
                    <Typography variant='subtitle1' sx={{display:'flex', justifyContent:'flex-start', width:'1',color:'gray'}}>Already have an account?
                        <Link to='/login' style={{textDecoration:'none'}}><Typography variant='subtitle1' sx={{color:'blue', ml:'5px'}}>Sign In</Typography></Link>
                    </Typography>
                    </Box>
                    <Box height='20%' sx={{display:'flex', flexDirection:'column', alignSelf:'flex-start'}}>
                    <Typography sx={{width:'1', fontWeight:'bold'}} variant='h4'> Welcome To Manage</Typography>
                    <Typography sx={{width:'1', mt:4, color:'gray'}}> Let's get you all set up so you can verify, <br/> your personnal account and begin setting up your profile.</Typography>
                    </Box>
                    <Box height='70%' sx={{display:'flex', flexDirection:'column', alignSelf:'flex-start'}}>
                    <form onSubmit={handleSubmit} >
                        <TextField required size='medium' sx={{width:'1'}} helperText='Please enter your email'
                        id="outlined-basic" label="Email" type='text' name='email'variant="outlined" value={formValues.email} onChange={handleInputChange}/>
                        <TextField required sx={{width:'1', borderColor:'blue', my:3}} helperText='Please enter your password'
                        id="outlined-basic" label="Password" type='password' name='password'variant="outlined" size="medium" value={formValues.password} onChange={handleInputChange}/>
                        <Button variant="contained" type="submit" color='primary' sx={{width:'40%%', mt:'20px', bgcolor:'black'}}>Create an account</Button>
                    </form>
                    </Box>
                </Box>
            </Grid>
         </Grid>
    )
}