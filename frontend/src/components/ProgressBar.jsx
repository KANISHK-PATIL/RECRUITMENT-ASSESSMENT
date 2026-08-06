function ProgressBar({ current, total }) {

    const percentage = (current / total) * 100;

    return (

        <div className="w-full">

            <div className="flex justify-between mb-2 font-mono text-xs uppercase tracking-wider">

                <span className="text-slate-500">
                    Progress
                </span>
                <span className="text-signal font-semibold">
                    {current} / {total}
                </span>

            </div>
            <div className="w-full bg-line rounded-full h-2">
                <div
                    className="bg-signal h-2 rounded-full transition-all duration-500"
                    style={{
                        width: `${percentage}%`
                    }}
                >
                </div>
            </div>
        </div>
    );
}
export default ProgressBar;