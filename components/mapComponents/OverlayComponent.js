import styles from './overlay.module.css'
import React, { useEffect,useRef, useState } from 'react';
import Ome from '../../pages/posts/ome'

const OverlayComponent = ({data}) => {
    const droneData = useRef();
    const [id,setId] = useState();
    const [lat,setLat] = useState();
    const [long,setLong]= useState();
    // droneData.current = JSON.parse(data);
    useEffect(()=>{
        function updateRef(){
            // console.log(data);
            if(data.current){
                droneData.current = JSON.parse(data.current);
                setId(droneData.current.id);
                setLat(droneData.current.lat);
                setLong(droneData.current.long);
            }
        }
        setInterval(updateRef, 3000);
    })

    return (
        <>
        <div className={styles.overlayTop}>
            <Ome/>
        </div>
        <div className={styles.overlayBot}>
            ID : {id}<br/>
            Latitude : {lat}<br/>
            Longitude : {long}<br/>
        </div>
      </>
    );
  };
  
  export default OverlayComponent;