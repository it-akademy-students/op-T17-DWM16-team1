import { useState, useEffect } from 'react'
import { Login } from "../auth/login-form"
import { Test } from './test'


export const MainScreen = () => {
    const user = window.localStorage.getItem('uid')
    console.log(window.localStorage.getItem('uid'))
    if(user === null){
        return(
            <Login/>
        )
    }else {
        return (
            <Test/>
        )
    }
}