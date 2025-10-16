import {Link} from "react-router-dom";
import {useTheme} from "../context/ThemeContext";

export default function Navbar(){
    const {theme, toggle} = useTheme();
    return(
        <nav className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="font-bold text-xl">Week3App</Link>
                <div className="flex items-center gap-3">
                    <Link to="/tasks" className="hover:underline">Tasks</Link>
                    <Link to="/posts" className="hover:underline">Posts</Link>
                    <button onClick={toggle} className="ml-2 px-2 py-1 border rounded">
                        {theme === "dark"?"Dark":"Light"}
                    </button>

                </div>

            </div>

        </nav>
    );
}