import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router';
import {Link} from 'react-router-dom'
import { Typography } from '@mui/material';

export const Login = () => {
    let navigate = useNavigate()
    const defaultValues = {
        email: '',
        password:'',
      };
    const [formValues, setFormValues] = useState(defaultValues)
    // const navigate = useNavigate()
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
        axios.post('http://localhost:9000/login', {email, password})
        .then((result) => {if(result.data.status === 'ok'){
            const uid = result.data.data._id
            console.log(uid)
            navigate('/plaid', {state: {uid}})
        }else{
            alert(result.data.error)
        }})
      };

    return(
        <Container maxWidth="xs">
        <Box sx={{mt: 8, display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Typography variant='h5'>Sign In</Typography>
            <form onSubmit={handleSubmit} style={{ width:'100%'}}>
                <Box sx={{ mt: 1, display:'flex', flexDirection:'column'}}>
                <TextField helperText='Please Enter your email' margin='normal' fullWidth id="standard-basic" label="Email" type='text' name='email' variant="outlined" size="small" required value={formValues.email} onChange={handleInputChange}/>
                <TextField helperText='Please Enter your password' margin='normal' fullWidth id="outlined-basic" label="Password" type='password' name='password' variant="outlined" size="small" required value={formValues.password} onChange={handleInputChange}/>
                <FormControlLabel control={<Checkbox value="remember" color="primary" />}label="Remember me"/>
                <Button variant="contained" fullWidth type="submit" sx={{bgcolor:'black', my:2}}>Login</Button>
                </Box>
            </form>
            <Link to='/register' style={{display: 'flex', alignSelf:'flex-end', marginTop:'10px'}}><Typography variant='overline' > Don't have an Account? Sign Up</Typography></Link>
            <Typography variant='caption' mt='40px'> Copyright © Manage 2021.</Typography>
        </Box>
        </Container>
    )
}