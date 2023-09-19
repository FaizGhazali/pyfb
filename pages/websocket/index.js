import React, { useEffect,useRef } from 'react';
import HEREMaps from '../../components/mapComponents/Map';
import OverlayComponent from '../../components/mapComponents/OverlayComponent'
import styles from './ws.module.css';
import Header from '../../components/Header';

const WebS =()=>{
    const dataRef = useRef();
    
    useEffect(() => {
        const socket = new WebSocket('ws://103.233.1.179:3000');
    
        socket.addEventListener('open', (event) => {
          console.log('WebSocket is open:', event);
          socket.send('Hello, server!');
        });
    
        socket.addEventListener('message', (event) => {
           // console.log('Message from server:', event);
            dataRef.current = event.data;
           
        });
    
        socket.addEventListener('close', (event) => {
          console.log('WebSocket is closed:', event);
        });
    
        socket.addEventListener('error', (event) => {
          console.error('WebSocket error:', event);
        });
    
        return () => {
          socket.close(); // Close the connection when component is unmounted
        };
      }, []);

    return (
        <>
         <Header />
        
        
        <HEREMaps data={dataRef} />
        <OverlayComponent data={dataRef}/>
        </>
    )
}

export default WebS;