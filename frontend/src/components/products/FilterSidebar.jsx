import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const CATEGORIES = ['Top Wear', 'Bottom Wear'];
const GENDERS = ['Men', 'Women'];
const COLORS = ['Red', 'Blue', 'Black', 'Green', 'Yellow', 'Gray', 'White', 'Pink', 'Beige', 'Navy', 'Purple'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36'];
const MATERIALS = ['Cotton', 'Denim', 'Wool', 'Leather', 'Polyester', 'Fleece', 'Rayon'];
const BRANDS = ['UrbanThread', 'FashionBrand', 'Formalia', 'StreetKit', 'Bloom'];
const MAX_PRICE = 6000;

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [price, setPrice] = useState(Number(searchParams.get('maxPrice')) || MAX_PRICE);

    const update = (mutate) => {
        const params = new URLSearchParams(searchParams);
        mutate(params);
        setSearchParams(params);
    };

    const setSingle = (key, value) => update((p) => (value ? p.set(key, value) : p.delete(key)));

    const toggleMulti = (key, value) =>
        update((p) => {
            const current = (p.get(key) || '').split(',').filter(Boolean);
            const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
            if (next.length) p.set(key, next.join(','));
            else p.delete(key);
        });

    const isChecked = (key, value) => (searchParams.get(key) || '').split(',').includes(value);

    const clearAll = () => {
        setPrice(MAX_PRICE);
        const params = new URLSearchParams();
        if (searchParams.get('search')) params.set('search', searchParams.get('search'));
        setSearchParams(params);
    };

    const Section = ({ title, children }) => (
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>{title}</label>
            {children}
        </div>
    );

    const checkList = (key, options) =>
        options.map((o) => (
            <div key={o} className='flex items-center mb-1'>
                <input type='checkbox' checked={isChecked(key, o)} onChange={() => toggleMulti(key, o)} className='mr-2 h-4 w-4' />
                <span className='text-gray-700'>{o}</span>
            </div>
        ));

    return (
        <div className='p-4'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-xl font-medium text-gray-800'>Filter</h3>
                <button onClick={clearAll} className='text-sm text-gray-500 underline'>Clear all</button>
            </div>

            <Section title='Category'>
                {CATEGORIES.map((c) => (
                    <div key={c} className='flex items-center mb-1'>
                        <input type='radio' name='category' checked={searchParams.get('category') === c} onChange={() => setSingle('category', c)} className='mr-2 h-4 w-4' />
                        <span className='text-gray-700'>{c}</span>
                    </div>
                ))}
            </Section>

            <Section title='Gender'>
                {GENDERS.map((g) => (
                    <div key={g} className='flex items-center mb-1'>
                        <input type='radio' name='gender' checked={searchParams.get('gender') === g} onChange={() => setSingle('gender', g)} className='mr-2 h-4 w-4' />
                        <span className='text-gray-700'>{g}</span>
                    </div>
                ))}
            </Section>

            <Section title='Color'>
                <div className='flex flex-wrap gap-2'>
                    {COLORS.map((c) => (
                        <button
                            key={c}
                            title={c}
                            aria-label={c}
                            onClick={() => toggleMulti('color', c)}
                            className={`w-8 h-8 rounded-full border cursor-pointer transition hover:scale-105 ${isChecked('color', c) ? 'ring-2 ring-black' : 'border-gray-300'}`}
                            style={{ backgroundColor: c.toLowerCase() }}
                        />
                    ))}
                </div>
            </Section>

            <Section title='Size'>{checkList('size', SIZES)}</Section>
            <Section title='Material'>{checkList('material', MATERIALS)}</Section>
            <Section title='Brand'>{checkList('brand', BRANDS)}</Section>

            <Section title='Price Range'>
                <input
                    type='range'
                    min={0}
                    max={MAX_PRICE}
                    step={100}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    onMouseUp={() => setSingle('maxPrice', price >= MAX_PRICE ? '' : price)}
                    onTouchEnd={() => setSingle('maxPrice', price >= MAX_PRICE ? '' : price)}
                    onKeyUp={() => setSingle('maxPrice', price >= MAX_PRICE ? '' : price)}
                    className='w-full h-2 bg-gray-300 rounded-lg cursor-pointer'
                />
                <div className='flex justify-between text-gray-600 mt-2'>
                    <span>₹0</span>
                    <span>₹{price.toLocaleString('en-IN')}</span>
                </div>
            </Section>
        </div>
    )
}

export default FilterSidebar
