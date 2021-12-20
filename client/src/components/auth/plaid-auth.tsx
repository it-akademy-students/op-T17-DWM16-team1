import React, { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useNavigate } from 'react-router-dom';
export const PlaidAuth = () => {
    const [publicToken, setPublicToken] = useState('')
    const [nextStep, setNextStep] = useState('')
    const uid = window.localStorage.getItem('uid')
    console.log(uid)

    const fetchLinkToken = async () => {
        const response = await fetch('http://localhost:9000/create_link_token')
        const { link_token } = await response.json()
        setPublicToken(link_token)
    }
    
    useEffect(() => {
        fetchLinkToken()
    }, [])

    const onSuccess = useCallback(
        (public_token, metadata) => {
          setNextStep(public_token)
          console.log('onSuccess', public_token, metadata)
            fetch('http://localhost:9000/plaid_token_exchange',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_token, uid}),
                      
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const onEvent = useCallback(
        (eventName, metadata) => console.log('onEvent', eventName, metadata),
        []
    );

    const onExit = useCallback(
        (err, metadata) => console.log('onExit', err, metadata),
        []
    );
    const config = {
        token: publicToken,
        onSuccess,
        onEvent,
        onExit,
    // –– optional parameters
    // receivedRedirectUri: props.receivedRedirectUri || null,
    // ...
  };

  const { open } = usePlaidLink(config);
  const navigate = useNavigate()
  open()
  const nextStepFunction = async() =>{
    if(nextStep){
      navigate('/test')
    }
  }
  return (
    <>
    <button onClick={nextStepFunction}></button>
    </>
  );
};

