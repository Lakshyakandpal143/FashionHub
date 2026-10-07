import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { api } from '../../api'

const EMPTY = {
    name: '', description: '', price: '', originalPrice: '', countInStock: '', sku: '',
    category: 'Top Wear', gender: 'Unisex', brand: '', material: '',
    sizes: '', colors: '', images: '', isPublished: true,
};

const splitList = (s) => s.split(',').map((x) => x.trim()).filter(Boolean);

// Handles both "new product" (/admin/products/new) and "edit" (/admin/products/:id/edit)
const EditProduct = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isEdit) return;
        api.get(`/admin/products`)
            .then((all) => {
                const p = all.find((x) => x._id === id);
                if (!p) throw new Error('Product not found');
                setForm({
                    ...EMPTY, ...p,
                    price: p.price ?? '', originalPrice: p.originalPrice ?? '', countInStock: p.countInStock ?? '',
                    sku: p.sku || '', brand: p.brand || '', material: p.material || '',
                    sizes: p.sizes.join(', '), colors: p.colors.join(', '),
                    images: p.images.map((i) => i.url).join('\n'),
                });
            })
            .catch((e) => { toast.error(e.message); navigate('/admin/products'); })
            .finally(() => setLoading(false));
    }, [id, isEdit, navigate]);

    const set = (field) => (e) =>
        setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const images = form.images.split('\n').map((u) => u.trim()).filter(Boolean).map((url) => ({ url, altText: form.name }));
        if (images.length === 0) return toast.error('Add at least one image URL');

        const payload = {
            name: form.name, description: form.description,
            price: Number(form.price),
            originalPrice: form.originalPrice === '' ? undefined : Number(form.originalPrice),
            countInStock: Number(form.countInStock),
            sku: form.sku || undefined,
            category: form.category, gender: form.gender, brand: form.brand, material: form.material,
            sizes: splitList(form.sizes), colors: splitList(form.colors),
            images, isPublished: form.isPublished,
        };
        setSaving(true);
        try {
            if (isEdit) await api.put(`/products/${id}`, payload);
            else await api.post('/products', payload);
            toast.success(isEdit ? 'Product updated' : 'Product created');
            navigate('/admin/products');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    const input = 'w-full border border-gray-300 rounded-md p-2';
    const label = 'block font-semibold mb-1';

    return (
        <div className='max-w-3xl mx-auto p-6 shadow-md rounded-md bg-white'>
            <h2 className='text-3xl font-bold mb-6'>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div><label className={label}>Name</label><input className={input} value={form.name} onChange={set('name')} required /></div>
                <div><label className={label}>Description</label><textarea className={input} rows={4} value={form.description} onChange={set('description')} required /></div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div><label className={label}>Price (₹)</label><input type='number' min='0' className={input} value={form.price} onChange={set('price')} required /></div>
                    <div><label className={label}>Original price (₹)</label><input type='number' min='0' className={input} value={form.originalPrice} onChange={set('originalPrice')} /></div>
                    <div><label className={label}>Stock</label><input type='number' min='0' className={input} value={form.countInStock} onChange={set('countInStock')} required /></div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div><label className={label}>SKU</label><input className={input} value={form.sku} onChange={set('sku')} /></div>
                    <div><label className={label}>Category</label>
                        <select className={input} value={form.category} onChange={set('category')}>
                            <option>Top Wear</option><option>Bottom Wear</option>
                        </select>
                    </div>
                    <div><label className={label}>Gender</label>
                        <select className={input} value={form.gender} onChange={set('gender')}>
                            <option>Men</option><option>Women</option><option>Unisex</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div><label className={label}>Brand</label><input className={input} value={form.brand} onChange={set('brand')} /></div>
                    <div><label className={label}>Material</label><input className={input} value={form.material} onChange={set('material')} /></div>
                </div>
                <div><label className={label}>Sizes (comma separated)</label><input className={input} placeholder='S, M, L, XL' value={form.sizes} onChange={set('sizes')} required /></div>
                <div><label className={label}>Colors (comma separated)</label><input className={input} placeholder='Black, Blue' value={form.colors} onChange={set('colors')} required /></div>
                <div><label className={label}>Image URLs (one per line)</label><textarea className={input} rows={3} value={form.images} onChange={set('images')} required /></div>
                <label className='flex items-center gap-2'><input type='checkbox' checked={form.isPublished} onChange={set('isPublished')} /> Published (visible in the shop)</label>
                <button disabled={saving} className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50'>
                    {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                </button>
            </form>
        </div>
    )
}

export default EditProduct
