import React, { useState,useRef,useEffect } from 'react';
import HEREMaps from '../../components/map'
import ApiKeyForm from '../../components/ApiKeyForm';
import { useApiKey } from '../../components/ApiKeyContext';
import ChildComponent from '../../components/ChildComponent';

import Button from '../../components/Button/MButton'

const Home=()=>{
    const [dataFromChild, setDataFromChild] = useState(null);
    const handleDataFromChild = (data) => {
        setDataFromChild(data);
      };
    const [dataFromChildMButton, setDataFromMButton] = useState(null);
    const handleDataFromMButton =(data)=>{
        setDataFromMButton(data);
        myRef.current=data;
    }

    const myRef = useRef('newValue');

    useEffect(() => {
        myRef.current ;
      }, []);


    const { apiKey, updateApiKey } = useApiKey();
    const handleApiKeySubmit = (key) => {
        updateApiKey(key);
        };
    return(
        <>
        <h1>Map Sticker Moving Based on Stored Db gps</h1>
        <h3>ykV0LNTyrAZsQSzEcTasWIm_E2bo8fr5wrKFYaGUQPY</h3>
        <ChildComponent sendDataToParent={handleDataFromChild} />
        {dataFromChild && <p>Data received from child: {dataFromChild}</p>}
        <Button sendDataToMButton={handleDataFromMButton}/>
        {dataFromChildMButton && <p>Data received from child: {dataFromChildMButton}</p>}
        {!apiKey ? (
                <ApiKeyForm onSubmit={handleApiKeySubmit} />
                   ) : (<div>
                       <p>Input Here Maps Api  : {apiKey}</p>
                       {/* Pass refreshFlag to ComponentB */}
                        <HEREMaps forwardedRef={myRef}/>
                   </div>
                 
                )}
        </>
    )
}

export default Home;