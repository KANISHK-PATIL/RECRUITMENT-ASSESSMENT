import ScoreCard from "../components/ScoreCard";

function classificationStyle(classification) {
    switch (classification) {
        case "Outstanding Candidate":
            return "border-emerald-600 text-emerald-700";
        case "Highly Qualified":
            return "border-signal text-signal";
        case "Qualified Candidate":
            return "border-blue-600 text-blue-700";
        case "Developing Candidate":
            return "border-amber-600 text-amber-700";
        default:
            return "border-flag text-flag";
    }
}

function formatTime(totalTime) {
    if (!totalTime && totalTime !== 0) return "—";
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function Report() {

    let report = null;

    try {
        report = JSON.parse(localStorage.getItem("report"));
    } catch (error) {
        report = null;
    }

    if (!report) {
        return (
            <div className="max-w-2xl mx-auto mt-20 bg-panel border border-line p-10 rounded-2xl text-center">
                <h1 className="font-display text-2xl font-bold text-ink">
                    No Report Found
                </h1>
                <p className="font-body text-slate-500 mt-3">
                    We couldn't find a completed assessment for this session.
                    Please complete the assessment first.
                </p>
                <button
                    onClick={() => (window.location.href = "/")}
                    className="mt-6 bg-ink hover:bg-signal-dark text-white font-display font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                    Start Assessment
                </button>
            </div>
        );
    }

    const stages = [
        {
            label: "Aptitude",
            score: report.aptitude?.score,
            time: report.aptitude?.time,
            detail: `${report.aptitude?.correct ?? 0} correct · ${report.aptitude?.incorrect ?? 0} incorrect`
        },
        {
            label: "Memory Matrix",
            score: report.memory?.score,
            time: report.memory?.time,
            detail: `Level ${report.memory?.highestLevel ?? 0} reached · ${report.memory?.incorrectAttempts ?? 0} mistakes`
        },
        {
            label: "Decode Encrypted",
            score: report.encrypted?.score,
            time: report.encrypted?.time,
            detail: `${report.encrypted?.incorrect ?? 0} incorrect · ${report.encrypted?.hintsUsed ?? 0} hints used`
        }
    ];

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-10 px-4">

            <div className="bg-panel border border-line rounded-2xl shadow-xl overflow-hidden">
                <div className="h-1.5 bg-signal"></div>

                <div className="p-10">

                    <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase text-center mb-2">
                        Assessment Dossier
                    </p>
                    <h1 className="font-display text-3xl font-bold text-center text-ink">
                        {report.name}
                    </h1>

                    <div className="flex justify-center mt-6">
                        <span
                            className={`font-mono uppercase text-sm font-bold tracking-widest border-2 rounded-md px-6 py-2 -rotate-2 inline-block ${classificationStyle(
                                report.classification
                            )}`}
                        >
                            {report.classification}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                        <ScoreCard label="Aptitude" score={report.aptitude?.score} />
                        <ScoreCard label="Memory" score={report.memory?.score} />
                        <ScoreCard label="Encryption" score={report.encrypted?.score} />
                        <ScoreCard label="Total" score={report.totalScore} />
                    </div>

                    <div className="mt-8 space-y-3">
                        {stages.map((stage) => (
                            <div
                                key={stage.label}
                                className="bg-paper border border-line rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-display font-semibold text-ink">
                                        {stage.label}
                                    </p>
                                    <p className="font-body text-xs text-slate-500 mt-1">
                                        {stage.detail}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono font-bold text-ink">
                                        {stage.score} pts
                                    </p>
                                    <p className="font-mono text-xs text-slate-500">
                                        {formatTime(stage.time)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-paper border border-line rounded-lg p-5 flex justify-between items-center">
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                            Total Assessment Time
                        </span>
                        <span className="font-mono text-xl font-bold text-ink">
                            {formatTime(report.totalTime)}
                        </span>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={() => (window.location.href = "/leaderboard")}
                            className="flex-1 bg-ink hover:bg-signal-dark text-white font-display font-semibold p-3 rounded-lg transition-colors"
                        >
                            View Leaderboard
                        </button>
                        <button
                            onClick={() => (window.location.href = "/")}
                            className="flex-1 bg-paper hover:bg-line border border-line text-ink font-display font-semibold p-3 rounded-lg transition-colors"
                        >
                            New Assessment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Report;