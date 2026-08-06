function ColorButton({ color, onClick }) {

    let bg = "";

    if (color === "red") bg = "bg-red-500";
    else if (color === "blue") bg = "bg-blue-500";
    else if (color === "green") bg = "bg-emerald-500";
    else if (color === "yellow") bg = "bg-amber-400";
    else bg = "bg-purple-500";

    return (

        <button
            onClick={() => onClick(color)}
            className={`${bg} w-16 h-16 rounded-2xl shadow-md border-2 border-white/40 hover:scale-110 hover:shadow-lg transition-all`}
        >
        </button>
    );
}
export default ColorButton;