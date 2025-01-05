import DangerButton from '@/Components/DangerButton';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({
    products,
    categories,
    queryParams = null,
    success,
}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        console.log(name, value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('products.index', queryParams));
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    };

    const deleteProduct = (product) => {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        } else {
            router.delete(route('products.destroy', product.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-100">
                    Product
                </h2>
            }
        >
            <Head title="Dashboard" />

            {success && (
                <div className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                    {success}
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* <pre>{JSON.stringify(products, undefined, 2)}</pre> */}
                            <div className="flex justify-between">
                                <TextInput
                                    defaultValue={queryParams.name}
                                    className="m-1 w-8/12"
                                    placeholder="Product name"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress('name', e)}
                                />
                                <SelectInput
                                    defaultValue={queryParams.category_id}
                                    className="m-1 w-3/12"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            'category_id',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <Link href={route('products.create')}>
                                    <PrimaryButton className="m-1 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                        Add New Product
                                    </PrimaryButton>
                                </Link>
                            </div>
                            <table className="w-full text-left text-sm text-gray-900 rtl:text-right dark:text-gray-100">
                                <thead className="border-b-2 border-gray-500 bg-gray-50 text-center text-xs uppercase text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Image</th>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="px-3 py-2">
                                            Description
                                        </th>
                                        <th className="px-3 py-2">Price</th>
                                        <th className="px-3 py-2">Stock</th>
                                        <th className="px-3 py-2">Category</th>
                                        <th className="px-3 py-2">Create At</th>
                                        <th className="px-3 py-2">Update At</th>
                                        <th className="px-3 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-3 py-2">
                                                {product.id}
                                            </td>
                                            <td className="text-nowrap px-3 py-2">
                                                <img
                                                    src={
                                                        product.image.startsWith(
                                                            'http',
                                                        )
                                                            ? product.image // Đã là URL đầy đủ
                                                            : `/storage/${product.image}` // Đường dẫn tương đối
                                                    }
                                                    alt={product.name}
                                                    className="h-10 w-20 object-cover"
                                                />
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
                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route(
                                                        'products.edit',
                                                        product.id,
                                                    )}
                                                >
                                                    <SecondaryButton className="font-medium-600 m-1 text-blue-900 hover:underline dark:text-blue-300">
                                                        Edit
                                                    </SecondaryButton>
                                                </Link>

                                                <DangerButton
                                                    onClick={() =>
                                                        deleteProduct(product)
                                                    }
                                                    className="font-medium-600 m-1 text-red-900 hover:underline dark:text-red-300"
                                                    href={route(
                                                        'products.destroy',
                                                        product.id,
                                                    )}
                                                >
                                                    Delete
                                                </DangerButton>
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
