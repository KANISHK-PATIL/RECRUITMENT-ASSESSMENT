import { useEffect, useState } from "react";
import API from "../services/api";
import ColorButton from "../components/ColorButton";
import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";

const TOTAL_LEVELS = 3;
const MAX_MEMORY_SCORE = 35;
const PENALTY_PER_MISTAKE = 5;

function colorClass(color) {
    if (color === "red") return "bg-red-500";
    if (color === "blue") return "bg-blue-500";
    if (color === "green") return "bg-emerald-500";
    if (color === "yellow") return "bg-amber-400";
    return "bg-purple-500";
}

function Memory() {

    const [level, setLevel] = useState(1);
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [showSequence, setShowSequence] = useState(true);
    const [correctSequences, setCorrectSequences] = useState(0);
    const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        async function getSequence() {

            try {

                const response = await API.get(`/memory-sequence?level=${level}`);
                setSequence(response.data[0].sequence);
                setUserSequence([]);
                setShowSequence(true);

                setTimeout(() => {

                    setShowSequence(false);
                }, 3000);
            }
            catch (error) {
                console.log(error);
                alert("Unable to load sequence.");
            }
        }
        getSequence();
    }, [level]);

    function handleClick(color) {
        const updatedSequence = [...userSequence, color];
        setUserSequence(updatedSequence);
        if (updatedSequence.length === sequence.length) {
            const correct =
                JSON.stringify(updatedSequence) === JSON.stringify(sequence);
            if (correct) {
                const updatedCorrectSequences = correctSequences + 1;
                setCorrectSequences(updatedCorrectSequences);

                if (level < TOTAL_LEVELS) {
                    alert(`Level ${level} Completed! Moving to Level ${level + 1}.`);
                    setLevel(level + 1);
                } else {
                    const score = Math.max(
                        0,
                        MAX_MEMORY_SCORE - incorrectAttempts * PENALTY_PER_MISTAKE
                    );

                    localStorage.setItem("memoryScore", score);
                    localStorage.setItem("memoryTime", elapsedTime);
                    localStorage.setItem("memoryHighestLevel", TOTAL_LEVELS);
                    localStorage.setItem("memoryCorrect", updatedCorrectSequences);
                    localStorage.setItem("memoryIncorrect", incorrectAttempts);

                    alert("Memory Stage Completed!");
                    window.location.href = "/encrypt";
                }
            }
            else {
                // Qualification Rule: incorrect input ends the current level,
                // so the candidate must retry this same level; the mistake
                // is recorded and affects the stage score.
                setIncorrectAttempts((prev) => prev + 1);
                alert("Wrong Sequence! Try this level again.");
                setUserSequence([]);
                setShowSequence(true);
                setTimeout(() => {
                    setShowSequence(false);
                }, 3000);
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">

            <div className="flex justify-between items-center mb-4">
                <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase">
                    Stage 02 · Memory Matrix
                </p>
                <Timer onTimeChange={setElapsedTime} />
            </div>

            <div className="mb-4">
                <ProgressBar current={level} total={TOTAL_LEVELS} />
            </div>

            <div className="bg-panel border border-line rounded-2xl shadow-xl overflow-hidden">
                <div className="h-1.5 bg-signal"></div>
                <div className="p-8 text-center">

                    <h1 className="font-display text-2xl font-bold text-ink">
                        Level {level} of {TOTAL_LEVELS}
                    </h1>
                    <p className="font-body text-slate-500 mt-2">
                        {showSequence
                            ? "Remember this color sequence"
                            : "Click the colors in the same order"}
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        {
                            showSequence ?
                            sequence.map((color, index) => (
                                <div
                                    key={index}
                                    className={`w-14 h-14 rounded-2xl ${colorClass(color)} shadow-md`}
                                ></div>
                            ))
                            :
                            ["red","blue","green","yellow","purple"].map((color) => (
                                <ColorButton
                                    key={color}
                                    color={color}
                                    onClick={handleClick}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Memory;