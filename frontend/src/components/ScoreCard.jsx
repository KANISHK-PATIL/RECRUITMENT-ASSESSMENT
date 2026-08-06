function ScoreCard({ label, score }) {

    return (
        <div className="bg-panel border border-line rounded-xl p-5 text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                {label}
            </p>
            <p className="font-display text-4xl font-bold text-ink mt-2">
                {score}
            </p>
        </div>
    );
}
export default ScoreCard;