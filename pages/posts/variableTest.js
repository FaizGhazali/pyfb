
import { useMyContext } from '../../components/VariableContext';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import ShowApi from './ShowApi';

import { useApiKey } from '../../components/ApiKeyContext';
import ApiKeyForm from '../../components/ApiKeyForm';
import MQTT from '../mqtt-page'

const VariableTest = () => {
    const { myVariable } = useMyContext();
    const [latitude,longitude] =myVariable ? myVariable.split(' ') : [null, null];
    
    
    
   

    return (
    <div>
        Received Data: {myVariable} <br/>
        Latitude : {latitude} <br/>
        Longitude : {longitude} <br/>
        {/* <Map latitude={latitude} longitude={longitude}/> */}
        
    </div>);
    
};

export default VariableTest;