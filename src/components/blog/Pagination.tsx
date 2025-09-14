interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center items-center gap-4">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-white rounded-lg disabled:opacity-50">Précédent</button>
            {pages.map(page => (
                <button key={page} onClick={() => onPageChange(page)} className={`w-10 h-10 rounded-lg ${currentPage === page ? 'bg-kya-green text-white' : 'bg-white'}`}>{page}</button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-white rounded-lg disabled:opacity-50">Suivant</button>
        </nav>
    );
}