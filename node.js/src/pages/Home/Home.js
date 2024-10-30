import React, { useState, useEffect } from 'react';
import Timer from '../Timer/Timer';
import config from '../../config';

const start = performance.now();
let loadTime = 0;
const metrics_url = config.metrics_url;

export default function Home() {
    const [errCount, setErrCount] = useState(0);

    useEffect(() => {
        window.addEventListener('error', (e) => {
            setErrCount(prev => prev + 1);
        });
        const sendLoadTimeToBackend = async () => {
        try {
            const end = performance.now();
            loadTime = end - start;
            await fetch(`${metrics_url}`, {
            method: 'POST',
            body: JSON.stringify({ app_time: loadTime, errorCount: errCount }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
        } catch (err) {
            return;
        }
        };
        sendLoadTimeToBackend();
    },[loadTime, errCount]);

    return (
        <Timer/>
    )
}