export default function Button({children, variant = "primary",
    onClick, type="button", className = ""
}){
    const base = "px-4 py-2 rounded-md font-medium transition;"

    const variants = {
        primary:"bg-blue-600 text-white hover:bg-blue-700",
        secondary:"bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white",
        danger:"bg-red-500 text-white hover:bg-red-600",
    };
    return(
        <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
            {children}

        </button>
    );
}