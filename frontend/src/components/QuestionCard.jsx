function QuestionCard({

    question,

    currentQuestion,

    totalQuestions,

    selectedAnswer,

    setSelectedAnswer

}) {

    return (

        <div className="bg-panel border border-line rounded-2xl shadow-lg overflow-hidden">
            <div className="h-1.5 bg-signal"></div>
            <div className="p-8">

                <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase mb-2">
                    Question {currentQuestion} of {totalQuestions}
                </p>

                <h2 className="font-display text-2xl font-bold text-ink">
                    {question.question}
                </h2>

                <div className="mt-8 space-y-3">
                    {
                        question.option.map((option, index) => (
                            <button

                                key={index}
                                onClick={() => setSelectedAnswer(option)}

                                className={`
                                    w-full
                                    text-left
                                    p-4
                                    rounded-lg
                                    border
                                    font-body
                                    transition-colors
                                    ${selectedAnswer === option

                                        ? "bg-ink text-white border-ink"

                                        : "bg-white text-ink border-line hover:border-signal"}
                                `}
                            >
                                {option}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default QuestionCard;