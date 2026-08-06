import { useState } from "react";

function Home() {

    const [name, setName] = useState("");
    function startAssessment() {

        if (name.trim() === "") {
            alert("Please enter your name.");
            return;

        }

        localStorage.setItem("candidateName", name);
        window.location.href = "/aptitude";

    }

    return (
        <div className="flex justify-center mt-20 px-4">

            <div className="bg-panel border border-line rounded-2xl w-[460px] overflow-hidden shadow-xl">
                <div className="h-1.5 bg-signal"></div>
                <div className="p-10">
                    <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase mb-3">
                        Candidate Intake
                    </p>
                    <h2 className="font-display text-3xl font-bold text-ink">
                        Welcome
                    </h2>
                    <p className="font-body text-slate-500 mt-3">
                        Enter your name to begin the recruitment assessment.
                    </p>

                    <input
                        type="text"

                        placeholder="Full name"

                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-6 w-full border border-line rounded-lg p-3 font-body focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal"
                    />
                    <button
                        onClick={startAssessment}
                        className="w-full mt-6 bg-ink hover:bg-signal-dark text-white font-display font-semibold py-3 rounded-lg transition-colors"
                    >
                        Start Assessment →
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Home;