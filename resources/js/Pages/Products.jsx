import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ products }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-100">
                    Product
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(products, undefined, 2)}</pre> */}
                            <table className="w-full text-left text-sm text-gray-900 rtl:text-right dark:text-gray-100">
                                <thead className="border-b-2 border-gray-500 bg-gray-50 text-center text-xs uppercase text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">
                                            Description
                                        </th>
                                        <th className="px-3 py-2">Price</th>
                                        <th className="px-3 py-2">Stock</th>
                                        <th className="px-3 py-2">Category</th>
                                        <th className="px-3 py-2">Create At</th>
                                        <th className="px-3 py-2">Update At</th>
                                        <th className="px-3 py-2">Image</th>
                                        <th className="px-3 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-3 py-2">
                                                {product.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                {product.name}
                                            </td>
                                            <td className="px-3 py-2">
                                                {product.description}
                                            </td>
                                            <td className="text-nowrap px-3 py-2">
                                                {product.price} $
                                            </td>
                                            <td className="text-nowrap px-3 py-2">
                                                {product.stock}
                                            </td>
                                            <td className="px-3 py-2">
                                                {product.category}
                                            </td>
                                            <td className="px-3 py-2">
                                                {product.created_at}
                                            </td>
                                            <td className="px-3 py-2">
                                                {product.updated_at}
                                            </td>
                                            <td className="text-nowrap px-3 py-2">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                            </td>
                                            <td className="px-3 py-2">
                                                <Link
                                                    className="font-medium-600 mx-1 text-blue-900 hover:underline dark:text-blue-300"
                                                    href={route(
                                                        'products.edit',
                                                        product.id,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    className="font-medium-600 mx-1 text-red-900 hover:underline dark:text-red-300"
                                                    href={route(
                                                        'products.destroy',
                                                        product.id,
                                                    )}
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={products.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
