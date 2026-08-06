import { useEffect, useState } from "react";

function Timer({ onTimeChange }) {
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {

            setSeconds((oldSeconds) => {

                const newSeconds = oldSeconds + 1;

                if (onTimeChange) {
                    onTimeChange(newSeconds);
                }
                return newSeconds;

            });

        }, 1000);
        return () => clearInterval(timer);

    }, [onTimeChange]);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div className="bg-ink text-white px-5 py-3 rounded-lg font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse"></span>
            <span className="text-slate-400 text-xs uppercase tracking-wider">
                Time
            </span>
            <span className="font-semibold text-lg">
                {String(minutes).padStart(2, "0")}:
                {String(remainingSeconds).padStart(2, "0")}
            </span>
        </div>
    );
}
export default Timer;