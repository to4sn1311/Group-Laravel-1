import { Link } from '@inertiajs/react';

const Pagination = ({ links }) => {
    return (
        <nav className="mt-4 text-center">
            {links.map((link) => (
                <Link
                    // preserveScroll
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    key={`${link.url}-${link.label}`}
                    href={link.url || ''}
                    className={`mx-1 rounded px-3 py-1 ${
                        link.active
                            ? 'bg-black text-white'
                            : 'text-gray bg-white'
                    } hover:bg-gray-700 hover:text-white`}
                ></Link>
            ))}
        </nav>
    );
};

export default Pagination;
