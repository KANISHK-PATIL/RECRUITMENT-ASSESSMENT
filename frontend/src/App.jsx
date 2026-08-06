import Header from "./components/Header";

import Home from "./pages/Home";
import Aptitude from "./pages/Aptitude";
import Memory from "./pages/Memory";
import Encrypt from "./pages/Encrypt";
import Report from "./pages/Report";
import Leaderboard from "./pages/LeaderBoard";

function App() {
    const path = window.location.pathname;
    let page;
    if (path === "/aptitude")
        page = <Aptitude />;
    else if (path === "/memory")
        page = <Memory />;
    else if (path === "/encrypt")
        page = <Encrypt />;
    else if (path === "/report")
        page = <Report />;
    else if (path === "/leaderboard")
        page = <Leaderboard />;
    else
        page = <Home />;
    return (
        <div className="bg-paper min-h-screen font-body">
            <Header />
            {page}
        </div>
    );
}
export default App;