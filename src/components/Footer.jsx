export default function Footer(){
    return(
        <footer className="w=full border-t mt-8 bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
                &copy {new Date().getFullYear()} Week3App - Built with React & Tailwind

            </div>

        </footer>
    );
}