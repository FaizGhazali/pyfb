import { useEffect,useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Ome from './posts/ome'
import ApiKeyForm from '../components/ApiKeyForm';
import { useApiKey } from '../components/ApiKeyContext';
import Map from '../components/map';


export default function Home() {

    const { apiKey, updateApiKey } = useApiKey();
    const [refreshFlag, setRefreshFlag] = useState(false);
    

    const handleApiKeySubmit = (key) => {
    // Save the API key using the context function
    updateApiKey(key);
    setRefreshFlag(!refreshFlag);
    };

    
  
    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log("hello"); 
        }
    }, []); 
    return (
        <div id="parent element">
            <Head>
            <title>This is homepage</title>
            <link rel="icon" href="https://raw.githubusercontent.com/vercel/next-learn/master/basics/basics-final/public/images/profile.jpg" />
            </Head>
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() =>
                console.log(`script loaded correctly, window.FB has been populated`)
                }
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/ovenplayer@0.10.0/dist/ovenplayer.js"
                onLoad={() =>
                    console.log(`OvenPlayer script loaded correctly`)
                }
            />

            
            <h1>This is home page, <Link href="./posts/ShowApi">Click to go to the first post</Link></h1>
            
            <Ome/>
            
            
            
            {!apiKey ? (
            <ApiKeyForm onSubmit={handleApiKeySubmit} />
               ) : (
             <p>Input Here Maps Api  : {apiKey}</p>
            )}
            {/* Pass refreshFlag to ComponentB */}
            <Map refreshFlag={refreshFlag} />
            
        </div>
    );
}