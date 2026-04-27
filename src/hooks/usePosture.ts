/**
 * Hook controlling posture feedback simulation and metrics.
 */
import { useState, useEffect } from 'react';

export const usePosture = () => {
    const [kneeAngle, setKneeAngle] = useState(140);
    const [isCorrecting, setIsCorrecting] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setKneeAngle(prev => {
                const adjustment = isCorrecting ? 2.5 : -2.5;
                const next = prev + adjustment;
                if (next >= 165) setIsCorrecting(false);
                if (next <= 125) setIsCorrecting(true);
                return next;
            });
        }, 150);
        return () => clearInterval(interval);
    }, [isCorrecting]);

    const kneeStatus = kneeAngle >= 150 ? 'safe' : 'critical';

    return { kneeAngle, kneeStatus };
};
