import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { createTheme, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import '../../App.css'
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
        <Container maxWidth='xl' sx={{height:'100vh', width:'1',display:'flex', alignItems:'center',m:'0'}}>
        <Box sx={{width:'40%', height:'1' ,display:'flex', flexDirection:'column' ,alignItems:'center' ,bgcolor:'#0071ff'}}>
        <Box sx={{width:'60%', height:'25%', display:'flex', alignItems:'center'}}>
            <CreditCardIcon fontSize='large' sx={{color:'white'}}/>
            <Typography variant='h4' color='white' pl={'30px'}> Manage Yourself</Typography>
        </Box>
        </Box>
        <Box sx={{width:'60%', height:'1',display: 'flex' ,flexDirection:'column'}}>
            <Box sx={{width:'65%', height:'10%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='subtitle2' color='#90a4ae'>Have an account ? </Typography>
                <Link to="/login" style={{ textDecoration: 'none'}}><Typography variant='subtitle2' color='blue' ml='10px'>Sign In</Typography></Link>
            </Box>
            <Box sx={{width:'65%', height:'20%', display:'flex', flexDirection:'column', justifyContent:'center', alignSelf:'center'}}>
                <h1>Welcome To Manage</h1>
                <p style={{ fontSize:'16px', color:'grey', margin:'0'}}>Let's get you all set up so you can verify your personal account and begin setting up your profile.</p>
            </Box>
            <form onSubmit={handleSubmit} style={{width:'65%', height:'50vh',display:'flex', flexDirection:'column', alignSelf:'center'}}>
                <TextField sx={{width:'1', mt:'50px', mb:'30px'}}
                id="outlined-basic" label="Email" type='text' name='email'variant="outlined" size="small" value={formValues.email} onChange={handleInputChange}/>
                <TextField sx={{width:'1', borderColor:'blue'}} 
                id="outlined-basic" label="Password" type='text' name='password'variant="outlined" size="small" value={formValues.password} onChange={handleInputChange}/>
                <Button variant="contained" type="submit" color='primary' sx={{width:'1', mt:'20px'}}>Create an account</Button>
            </form>
        </Box>
        </Container>
    )
}