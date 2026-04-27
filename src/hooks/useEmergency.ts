/**
 * Logic hook binding the emergency alert systems and counters.
 */
import { useState, useEffect } from 'react';

export const useEmergency = () => {
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [statusUpdates, setStatusUpdates] = useState(['Monitoring biometrics parameters...', 'System on standby.']);

    useEffect(() => {
        let timer: any;
        if (isAlertActive && countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            if (countdown === 5) setStatusUpdates(prev => ['Initiating A* routing to the nearest available trauma center...', ...prev]);
            if (countdown === 3) setStatusUpdates(prev => ['Locking GPS coordinates: 40.7128° N, 74.0060° W...', ...prev]);
            if (countdown === 1) setStatusUpdates(prev => ['Transmitting medical profile and vitals to dispatch...', ...prev]);
        } else if (isAlertActive && countdown === 0) {
            setStatusUpdates(prev => ['ALERT SENT: First responders dispatched. ETA 4 mins.', ...prev]);
        }
        return () => clearTimeout(timer);
    }, [isAlertActive, countdown]);

    const toggleAlert = () => {
        if (!isAlertActive) {
            setIsAlertActive(true);
            setCountdown(5);
        } else {
            setIsAlertActive(false);
            setStatusUpdates(prev => ['Emergency trigger manually cancelled.', 'Resuming normal perimeter monitoring...', ...prev]);
        }
    };

    return { isAlertActive, countdown, statusUpdates, toggleAlert };
}
