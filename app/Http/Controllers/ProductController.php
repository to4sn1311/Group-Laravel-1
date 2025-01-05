<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class ProductController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::query();

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('category_id')) {
            $query->where('category_id', request('category_id'));
        }

        // Sắp xếp theo ngày thêm mới nhất
        $query->orderBy('created_at', 'desc');

        $products = $query->paginate(10);

        $category = Category::all();

        return Inertia::render('Products', [
            'products' => ProductResource::collection($products),
            'categories' => $category,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateProduct', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);


        $imagePath = $request->file('image')->store('images/products', 'public');

        Product::create([
            'image' => $imagePath,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('EditProduct', [
            'product' => new ProductResource(resource: $product),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu tồn tại và không phải URL
            if ($product->image && !filter_var($product->image, FILTER_VALIDATE_URL)) {
                Storage::delete("public/{$product->image}");
            }

            // Lưu ảnh mới
            $data['image'] = $request->file('image')->store('images/products', 'public');
        } else {
            // Giữ nguyên ảnh cũ
            $data['image'] = $product->image;
        }

        // Cập nhật sản phẩm
        $product->update($data);

        return to_route('products.index')->with('success', "Product \"{$product->name}\" updated successfully.");
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return to_route('products.index')->with('success', 'Product deleted successfully.');
    }
}
