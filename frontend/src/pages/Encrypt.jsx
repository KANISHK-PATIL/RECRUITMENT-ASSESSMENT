import { useEffect, useState } from "react";
import API from "../services/api";
import Timer from "../components/Timer";

const MAX_ENCRYPT_SCORE = 35;
const PENALTY_PER_INCORRECT = 5;
const PENALTY_PER_HINT = 2;

function Encrypt() {

    const [messages, setMessages] = useState([]);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        async function getMessages() {
            const response = await API.get("/encrypted");
            setMessages(response.data);
        }

        getMessages();
    }, []);

    if (messages.length === 0) {
        return (
            <p className="text-center font-mono text-signal mt-20 uppercase tracking-widest">
                Loading...
            </p>
        );
    }

    function useHint() {
        setHintsUsed((prev) => prev + 1);
        alert(messages[index].hint);
    }

    async function submitAnswer() {
        const response = await API.post("/encrypted/submit", {
            messageId: messages[index]._id,
            submittedAnswer: answer
        });

        if (!response.data.correct) {
            // Qualification Rule: all 3 messages must be decoded correctly
            // to complete the trial, so a wrong answer stays on this
            // message and only the mistake is recorded.
            setIncorrectCount((prev) => prev + 1);
            alert("Wrong Answer. Try again.");
            setAnswer("");
            return;
        }

        const updatedCorrectCount = correctCount + 1;
        setCorrectCount(updatedCorrectCount);

        if (index < messages.length - 1) {
            setIndex(index + 1);
            setAnswer("");
        }

        else {
            const score = Math.max(
                0,
                MAX_ENCRYPT_SCORE -
                    incorrectCount * PENALTY_PER_INCORRECT -
                    hintsUsed * PENALTY_PER_HINT
            );

            const aptitude = {
                attempted: Number(localStorage.getItem("aptitudeAttempted")) || 0,
                correct: Number(localStorage.getItem("aptitudeCorrect")) || 0,
                incorrect: Number(localStorage.getItem("aptitudeIncorrect")) || 0,
                time: Number(localStorage.getItem("aptitudeTime")) || 0,
                score: Number(localStorage.getItem("aptitudeScore")) || 0
            };

            const memory = {
                highestLevel: Number(localStorage.getItem("memoryHighestLevel")) || 0,
                correctSequences: Number(localStorage.getItem("memoryCorrect")) || 0,
                incorrectAttempts: Number(localStorage.getItem("memoryIncorrect")) || 0,
                time: Number(localStorage.getItem("memoryTime")) || 0,
                score: Number(localStorage.getItem("memoryScore")) || 0
            };

            const encrypted = {
                correct: updatedCorrectCount,
                incorrect: incorrectCount,
                hintsUsed,
                time: elapsedTime,
                score
            };

            const report = await API.post("/report", {
                name: localStorage.getItem("candidateName"),
                aptitude,
                memory,
                encrypted
            });

            localStorage.setItem("report", JSON.stringify(report.data));

            await API.post("/leaderboard", {
                name: report.data.name,
                score: report.data.totalScore,
                classification: report.data.classification,
                totalTime: report.data.totalTime
            });

            window.location.href = "/report";
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">

            <div className="flex justify-between items-center mb-4">
                <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase">
                    Stage 03 · Decode Encrypted Data
                </p>
                <Timer onTimeChange={setElapsedTime} />
            </div>

            <div className="bg-panel border border-line rounded-2xl shadow-xl overflow-hidden">
                <div className="h-1.5 bg-signal"></div>
                <div className="p-8">

                    <h1 className="font-display text-2xl font-bold text-ink">
                        Cipher {index + 1} of {messages.length}
                    </h1>

                    <div className="bg-paper border border-line p-5 rounded-lg mt-6">
                        <h2 className="font-mono text-xl text-ink tracking-wide">
                            {messages[index].encrypt}
                        </h2>
                    </div>

                    <button
                        className="mt-4 bg-flag hover:opacity-90 text-white font-display font-semibold px-4 py-2 rounded-lg transition-opacity"
                        onClick={useHint}
                    >
                        Show Hint
                    </button>

                    <input
                        type="text"
                        placeholder="Decoded message"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border border-line w-full mt-5 p-3 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal"
                    />
                    <button
                        onClick={submitAnswer}
                        className="bg-ink hover:bg-signal-dark text-white font-display font-semibold w-full mt-5 p-3 rounded-lg transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Encrypt;