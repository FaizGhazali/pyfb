import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Ome from './posts/ome'

export default function Home() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log("hello"); // This will run only on the client side
            // const player = OvenPlayer.create('player_id', {
            //     sources: [
            //         {
            //             label: 'label_for_webrtc',
            //             // Set the type to 'webrtc'
            //             type: 'webrtc',
            //             // Set the file to WebRTC Signaling URL with OvenMediaEngine 
            //             file: 'ws://192.168.0.100:5754/app/stream'
            //         }
            //     ]
            // });
        }
    }, []); // Empty depend
    
    // const player = OvenPlayer.create('player_id', {
    //     sources: [
    //         {
    //             label: 'label_for_webrtc',
    //             // Set the type to 'webrtc'
    //             type: 'webrtc',
    //             // Set the file to WebRTC Signaling URL with OvenMediaEngine 
    //             file: 'ws://192.168.0.100:5754/app/stream'
    //         }
    //     ]
    // });
    // useEffect(() => {
    //     // Define your OvenPlayer-related code here
    //     const player = OvenPlayer.create('player_id', {
    //         sources: [
    //             {
    //                 label: 'label_for_webrtc',
    //                 // Set the type to 'webrtc'
    //                 type: 'webrtc',
    //                 // Set the file to WebRTC Signaling URL with OvenMediaEngine 
    //                 file: 'ws://192.168.0.100:5754/app/stream'
    //             }
    //         ]
    //     });
    // }, []); // Empty depend
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

            
            <h1>This is home page, <Link href="http://localhost:3000/posts/ome">Click to go to the first post</Link></h1>
            <div id="player_id"></div>
            <Ome/>
            
        </div>
    );
  }