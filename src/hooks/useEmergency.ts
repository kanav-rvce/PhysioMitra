/**
 * Logic hook binding the emergency alert systems and counters.
 */
import { useState, useEffect, useRef, useCallback } from 'react';

export const useEmergency = () => {
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [statusUpdates, setStatusUpdates] = useState(['Monitoring biometrics parameters...', 'System on standby.']);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasShownMessageRef = useRef<Record<number, boolean>>({});

    useEffect(() => {
        if (!isAlertActive) {
            hasShownMessageRef.current = {};
            return;
        }

        if (countdown > 0) {
            timerRef.current = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (countdown === 0 && !hasShownMessageRef.current[0]) {
            hasShownMessageRef.current[0] = true;
            setStatusUpdates(prev => ['ALERT SENT: First responders dispatched. ETA 4 mins.', ...prev]);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isAlertActive, countdown]);

    useEffect(() => {
        if (!isAlertActive) return;

        if (countdown === 5 && !hasShownMessageRef.current[5]) {
            hasShownMessageRef.current[5] = true;
            setStatusUpdates(prev => ['Initiating A* routing to the nearest available trauma center...', ...prev]);
        } else if (countdown === 3 && !hasShownMessageRef.current[3]) {
            hasShownMessageRef.current[3] = true;
            setStatusUpdates(prev => ['Locking GPS coordinates: 40.7128° N, 74.0060° W...', ...prev]);
        } else if (countdown === 1 && !hasShownMessageRef.current[1]) {
            hasShownMessageRef.current[1] = true;
            setStatusUpdates(prev => ['Transmitting medical profile and vitals to dispatch...', ...prev]);
        }
    }, [countdown, isAlertActive]);

    const toggleAlert = useCallback(() => {
        setIsAlertActive(prev => {
            if (!prev) {
                setCountdown(5);
                hasShownMessageRef.current = {};
            } else {
                setStatusUpdates(s => ['Emergency trigger manually cancelled.', 'Resuming normal perimeter monitoring...', ...s]);
            }
            return !prev;
        });
    }, []);

    return { isAlertActive, countdown, statusUpdates, toggleAlert };
}
