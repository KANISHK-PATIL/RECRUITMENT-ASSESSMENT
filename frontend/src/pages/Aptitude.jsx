import { useEffect, useState } from "react";
import API from "../services/api";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";

const MAX_APTITUDE_SCORE = 30;
const PENALTY_PER_INCORRECT = 5;

function Aptitude() {

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    useEffect(() => {

        async function loadQuestions() {
            try {
                const response = await API.get("/aptitude");
                setQuestions(response.data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }

        loadQuestions();
    }, []);

    async function submitAnswer() {
        if (selectedAnswer === "") {
            alert("Please select an answer.");
            return;
        }

        const response = await API.post("/aptitude/submit", {
            questionId: questions[currentQuestion]._id,
            selectedAnswer: selectedAnswer
        });

        if (!response.data.correct) {
            // Qualification Rule: all 3 questions must be answered correctly
            // to unlock Stage 2, so a wrong answer stays on this question
            // and only the mistake is recorded (it affects the score).
            setIncorrectCount((prev) => prev + 1);
            alert("Wrong Answer. Try this question again.");
            setSelectedAnswer("");
            return;
        }

        const updatedCorrectCount = correctCount + 1;
        setCorrectCount(updatedCorrectCount);
        setSelectedAnswer("");

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const attempted = updatedCorrectCount + incorrectCount;
            const score = Math.max(
                0,
                MAX_APTITUDE_SCORE - incorrectCount * PENALTY_PER_INCORRECT
            );

            localStorage.setItem("aptitudeScore", score);
            localStorage.setItem("aptitudeTime", elapsedTime);
            localStorage.setItem("aptitudeAttempted", attempted);
            localStorage.setItem("aptitudeCorrect", updatedCorrectCount);
            localStorage.setItem("aptitudeIncorrect", incorrectCount);

            alert("Aptitude Stage Completed!");
            window.location.href = "/memory";
        }
    }

    if (loading) {
        return (
            <p className="text-center font-mono text-signal mt-20 uppercase tracking-widest">
                Loading...
            </p>

        );

    }

    if (questions.length === 0) {
        return (

            <p className="text-center font-mono text-slate-500 mt-20 uppercase tracking-widest">
                No Questions Found
            </p>

        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">

            <div className="flex justify-between items-center mb-4">
                <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase">
                    Stage 01 · Aptitude Challenge
                </p>
                <Timer onTimeChange={setElapsedTime} />
            </div>

            <QuestionCard
                question={questions[currentQuestion]}
                currentQuestion={currentQuestion + 1}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
            />
            <button
                onClick={submitAnswer}
                className="mt-6 w-full bg-ink hover:bg-signal-dark text-white font-display font-semibold px-8 py-3 rounded-lg transition-colors"
            >
                Submit →
            </button>
        </div>
    );
}
export default Aptitude;