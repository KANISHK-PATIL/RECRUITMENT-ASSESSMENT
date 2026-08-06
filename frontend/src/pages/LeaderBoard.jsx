import { useEffect, useState } from "react";
import API from "../services/api";

function Leaderboard() {

    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        async function getLeaderboard() {
            const response = await API.get("/leaderboard");
            setLeaders(response.data);
        }
        getLeaderboard();
    }, []);
    return (
        <div className="max-w-5xl mx-auto mt-10 mb-10 px-4">
            <div className="bg-panel border border-line rounded-2xl shadow-xl overflow-hidden">
                <div className="h-1.5 bg-signal"></div>
                <div className="p-8">

                    <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase text-center mb-2">
                        Standings
                    </p>
                    <h1 className="font-display text-3xl font-bold text-center text-ink mb-8">
                        Leaderboard
                    </h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-ink text-white font-mono text-xs uppercase tracking-wider">
                                <th className="p-3 rounded-l-lg">Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                                <th className="rounded-r-lg">Classification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaders.map((player, index) => (
                                    <tr
                                        key={player._id}
                                        className="text-center border-b border-line font-body hover:bg-paper transition-colors"
                                    >
                                        <td className="p-3 font-mono font-bold text-signal">
                                            {index + 1}
                                        </td>
                                        <td className="text-ink">
                                            {player.name}
                                        </td>
                                        <td className="font-mono font-semibold text-ink">
                                            {player.score}
                                        </td>
                                        <td className="text-slate-500 text-sm">
                                            {player.classification}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Leaderboard;