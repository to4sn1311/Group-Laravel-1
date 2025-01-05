import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EditProduct({ product, categories }) {
    const { data, setData, put, errors, reset } = useForm({
        image: product.data.image || '',
        name: product.data.name || '',
        description: product.data.description || '',
        price: product.data.price || '',
        stock: product.data.stock || '',
        category_id: product.data.category_id || '', // Cần đảm bảo backend trả về category_id
    });

    useEffect(() => {
        console.log('Product Data:', product);
        console.log('Form Data:', data);
    }, [product, data]);

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('products.update', { product: product.data.id }), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Product:{' '}
                    <span className="text-red">{product.name}</span>
                </h2>
            }
        >
            <Head title="Edit Product" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                onSubmit={onSubmit}
                                encType="multipart/form-data"
                                className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800"
                            >
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="products_name"
                                        value="Product Name"
                                    />
                                    <TextInput
                                        id="products_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="products_description"
                                        value="Product Description"
                                    />
                                    <TextAreaInput
                                        id="products_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="products_price"
                                        value="Price"
                                    />
                                    <TextInput
                                        id="products_price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.price}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="products_stock"
                                        value="Product Stock"
                                    />
                                    <TextInput
                                        id="products_stock"
                                        type="text"
                                        name="stock"
                                        value={data.stock}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('stock', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.stock}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="products_image_path"
                                        value="Product Image"
                                    />
                                    <img
                                        className="w-2/4"
                                        src={data.image}
                                        alt={data.image}
                                    />
                                    <TextInput
                                        id="products_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData('image', e.target.files[0])
                                        }
                                    />
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="products_category"
                                        value="Category"
                                    />
                                    <SelectInput
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                'category_id',
                                                e.target.value,
                                            )
                                        }
                                        className="m-1 w-3/12"
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError
                                        message={errors.category_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('products.index')}
                                        className="mr-2 rounded bg-gray-100 px-3 py-1 text-gray-800 shadow transition-all hover:bg-gray-200"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
