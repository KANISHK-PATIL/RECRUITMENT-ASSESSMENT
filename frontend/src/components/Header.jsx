function Header() {

    return (
        <header className="bg-ink border-b-4 border-signal">
            <div className="max-w-7xl mx-auto py-8 px-6">
                <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-2">
                    RHQ · Recruitment Headquarters
                </p>
                <h1 className="font-display text-white text-4xl md:text-5xl font-bold tracking-tight">
                    Assessment Trial
                </h1>
                <p className="font-body text-slate-400 mt-2 text-sm">
                    Three stages. One verdict.
                </p>
            </div>
        </header>
    );
}
export default Header;