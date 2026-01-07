'use client';

import { useState } from 'react';
import Link from 'next/link';

// Room types
const roomTypes = [
    { id: 'LIVING_ROOM', name: 'Living Room' },
    { id: 'BEDROOM', name: 'Bedroom' },
    { id: 'KITCHEN', name: 'Kitchen' },
    { id: 'BATHROOM', name: 'Bathroom' },
    { id: 'DINING_ROOM', name: 'Dining Room' },
    { id: 'HOME_OFFICE', name: 'Home Office' },
    { id: 'OTHER', name: 'Other' }
];

// Material options
const materialOptions = [
    { id: 'STANDARD_PAINT', name: 'Standard Paint', category: 'WALL', price: 2 },
    { id: 'PREMIUM_PAINT', name: 'Premium Paint', category: 'WALL', price: 4 },
    { id: 'WALLPAPER', name: 'Wallpaper', category: 'WALL', price: 6 },
    { id: 'WOOD_FLOORING', name: 'Wood Flooring', category: 'FLOOR', price: 10 },
    { id: 'TILE_FLOORING', name: 'Tile Flooring', category: 'FLOOR', price: 12 },
    { id: 'CARPET', name: 'Carpet', category: 'FLOOR', price: 8 },
    { id: 'MARBLE_FLOORING', name: 'Marble Flooring', category: 'FLOOR', price: 25 },
    { id: 'VINYL_FLOORING', name: 'Vinyl Flooring', category: 'FLOOR', price: 5 },
    { id: 'STANDARD_LIGHTING', name: 'Standard Lighting', category: 'FIXTURE', price: 200 },
    { id: 'PREMIUM_LIGHTING', name: 'Premium Lighting', category: 'FIXTURE', price: 500 },
    { id: 'CEILING_WORK', name: 'Ceiling Work', category: 'CEILING', price: 8 },
    { id: 'WALL_PANELING', name: 'Wall Paneling', category: 'WALL', price: 15 }
];

// Furniture options by room type
const furnitureByRoomType = {
    'LIVING_ROOM': [
        { id: 'SOFA', name: 'Sofa', price: 1200 },
        { id: 'COFFEE_TABLE', name: 'Coffee Table', price: 400 },
        { id: 'TV_UNIT', name: 'TV Unit', price: 800 },
        { id: 'RUG', name: 'Rug', price: 300 },
        { id: 'ACCENT_CHAIR', name: 'Accent Chair', price: 600 }
    ],
    'BEDROOM': [
        { id: 'BED', name: 'Bed', price: 1500 },
        { id: 'WARDROBE', name: 'Wardrobe', price: 1200 },
        { id: 'NIGHTSTAND', name: 'Nightstand', price: 250 },
        { id: 'DRESSER', name: 'Dresser', price: 700 }
    ],
    'KITCHEN': [
        { id: 'CABINETS', name: 'Cabinets', price: 3000 },
        { id: 'COUNTERTOP', name: 'Countertop', price: 1500 },
        { id: 'ISLAND', name: 'Kitchen Island', price: 1200 },
        { id: 'APPLIANCES', name: 'Appliances Set', price: 5000 }
    ],
    'BATHROOM': [
        { id: 'VANITY', name: 'Vanity', price: 800 },
        { id: 'SHOWER', name: 'Shower', price: 1200 },
        { id: 'TOILET', name: 'Toilet', price: 400 },
        { id: 'BATHTUB', name: 'Bathtub', price: 1500 }
    ],
    'DINING_ROOM': [
        { id: 'DINING_TABLE', name: 'Dining Table', price: 1200 },
        { id: 'DINING_CHAIRS', name: 'Dining Chairs (Set of 6)', price: 1500 },
        { id: 'BUFFET', name: 'Buffet/Sideboard', price: 900 }
    ],
    'HOME_OFFICE': [
        { id: 'DESK', name: 'Desk', price: 600 },
        { id: 'OFFICE_CHAIR', name: 'Office Chair', price: 400 },
        { id: 'BOOKSHELF', name: 'Bookshelf', price: 500 },
        { id: 'FILING_CABINET', name: 'Filing Cabinet', price: 300 }
    ],
    'OTHER': [
        { id: 'BASIC_FURNITURE', name: 'Basic Furniture Set', price: 2000 },
        { id: 'CUSTOM_FURNITURE', name: 'Custom Furniture', price: 3500 }
    ]
};

export default function BudgetCalculator() {
    // Form state
    const [dimensions, setDimensions] = useState({ length: 10, width: 10 });
    const [roomType, setRoomType] = useState('LIVING_ROOM');
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedFurniture, setSelectedFurniture] = useState([]);

    // Result state
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Handle dimension change
    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setDimensions({
            ...dimensions,
            [name]: parseFloat(value) || 0
        });
    };

    // Handle room type change
    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
        setSelectedFurniture([]);
    };

    // Handle material selection
    const handleMaterialToggle = (materialId) => {
        const existingIndex = selectedMaterials.findIndex(m => m.type === materialId);

        if (existingIndex >= 0) {
            // Remove if already selected
            setSelectedMaterials(selectedMaterials.filter(m => m.type !== materialId));
        } else {
            // Add with default coverage
            const material = materialOptions.find(m => m.id === materialId);
            const category = material.category;

            // Check if we already have a material of this category
            const existingCategoryMaterial = selectedMaterials.find(m => {
                const mat = materialOptions.find(opt => opt.id === m.type);
                return mat && mat.category === category;
            });

            // If we have a material of the same category, replace it
            if (existingCategoryMaterial && ['WALL', 'FLOOR', 'CEILING'].includes(category)) {
                setSelectedMaterials([
                    ...selectedMaterials.filter(m => {
                        const mat = materialOptions.find(opt => opt.id === m.type);
                        return mat && mat.category !== category;
                    }),
                    { type: materialId, coverage: 1 }
                ]);
            } else {
                // Otherwise just add it
                setSelectedMaterials([...selectedMaterials, { type: materialId, coverage: 1 }]);
            }
        }
    };

    // Handle furniture selection
    const handleFurnitureToggle = (furnitureId) => {
        const existingIndex = selectedFurniture.findIndex(f => f.type === furnitureId);

        if (existingIndex >= 0) {
            // Remove if already selected
            setSelectedFurniture(selectedFurniture.filter(f => f.type !== furnitureId));
        } else {
            // Add with quantity of 1
            const furniture = furnitureByRoomType[roomType].find(f => f.id === furnitureId);
            setSelectedFurniture([...selectedFurniture, {
                type: furnitureId,
                quantity: 1,
                price: furniture ? furniture.price : 0
            }]);
        }
    };

    // Handle furniture quantity change
    const handleFurnitureQuantityChange = (furnitureId, quantity) => {
        const updatedFurniture = selectedFurniture.map(item => {
            if (item.type === furnitureId) {
                return { ...item, quantity: parseInt(quantity) || 1 };
            }
            return item;
        });

        setSelectedFurniture(updatedFurniture);
    };

    // Calculate budget
    const calculateBudget = async () => {
        setIsCalculating(true);
        setError(null);

        try {
            const response = await fetch('/api/calculator/mock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dimensions,
                    roomType,
                    materials: selectedMaterials,
                    furniture: selectedFurniture
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to calculate budget');
            }

            setResult(data.data);
        } catch (err) {
            console.error('Error calculating budget:', err);
            setError(err.message || 'An error occurred while calculating the budget');
        } finally {
            setIsCalculating(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Budget Calculator</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Use our interactive calculator to estimate the cost of your interior design project. Add room dimensions, select materials, and furniture to get an instant budget estimate.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Room Dimensions */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Room Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Room Type</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={roomType}
                                    onChange={handleRoomTypeChange}
                                >
                                    {roomTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Length (ft)</label>
                                    <input
                                        type="number"
                                        name="length"
                                        min="1"
                                        value={dimensions.length}
                                        onChange={handleDimensionChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Width (ft)</label>
                                    <input
                                        type="number"
                                        name="width"
                                        min="1"
                                        value={dimensions.width}
                                        onChange={handleDimensionChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <p className="text-gray-600">
                                    Room Area: <span className="font-semibold">{dimensions.length * dimensions.width} sq ft</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Materials Selection */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Materials</h2>

                        <div className="space-y-6">
                            {['WALL', 'FLOOR', 'CEILING', 'FIXTURE'].map(category => {
                                const materialsInCategory = materialOptions.filter(m => m.category === category);
                                return (
                                    <div key={category} className="space-y-2">
                                        <h3 className="font-semibold">{category.charAt(0) + category.slice(1).toLowerCase()} Materials</h3>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {materialsInCategory.map(material => {
                                                const isSelected = selectedMaterials.some(m => m.type === material.id);
                                                return (
                                                    <div
                                                        key={material.id}
                                                        onClick={() => handleMaterialToggle(material.id)}
                                                        className={`p-3 border rounded-lg cursor-pointer flex items-center transition-colors ${isSelected ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <div className={`w-4 h-4 mr-2 rounded-full border ${isSelected ? 'border-white bg-white' : 'border-gray-400'}`}>
                                                            {isSelected && (
                                                                <div className="w-full h-full rounded-full bg-primary border-2 border-white"></div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="block text-sm">{material.name}</span>
                                                            <span className="block text-xs opacity-80">${material.price}/sq ft</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Furniture Selection */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Furniture</h2>

                        <div className="space-y-4">
                            {(furnitureByRoomType[roomType] || []).map(furniture => {
                                const selectedFurnitureItem = selectedFurniture.find(f => f.type === furniture.id);
                                const isSelected = !!selectedFurnitureItem;

                                return (
                                    <div key={furniture.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`furniture-${furniture.id}`}
                                                    checked={isSelected}
                                                    onChange={() => handleFurnitureToggle(furniture.id)}
                                                    className="w-4 h-4 text-primary focus:ring-primary"
                                                />
                                                <label htmlFor={`furniture-${furniture.id}`} className="ml-2 cursor-pointer">
                                                    <span className="font-medium">{furniture.name}</span>
                                                    <span className="text-gray-500 ml-2">${furniture.price.toLocaleString()}</span>
                                                </label>
                                            </div>

                                            {isSelected && (
                                                <div className="flex items-center">
                                                    <label className="text-sm mr-2">Quantity:</label>
                                                    <select
                                                        value={selectedFurnitureItem.quantity}
                                                        onChange={(e) => handleFurnitureQuantityChange(furniture.id, e.target.value)}
                                                        className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                            <option key={num} value={num}>{num}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={calculateBudget}
                            disabled={isCalculating}
                            className="bg-primary hover:bg-accent text-white py-3 px-8 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCalculating ? 'Calculating...' : 'Calculate Budget'}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    {/* Results Panel */}
                    <div className="bg-white p-6 rounded-xl shadow-md sticky top-6">
                        <h2 className="text-xl font-bold mb-4">Budget Estimate</h2>

                        {error && (
                            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        {!result && !error && (
                            <div className="text-center py-12 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <p>Please fill in the room details and click "Calculate Budget" to see your estimate.</p>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-gray-600">Estimated Total</p>
                                    <h3 className="text-3xl font-bold text-primary">${Math.round(result.totalCost).toLocaleString()}</h3>
                                    <p className="text-sm text-gray-500">For {result.area} sq ft {roomTypes.find(r => r.id === roomType)?.name}</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-semibold">Cost Breakdown</h3>

                                    <div className="space-y-2">
                                        {Object.entries(result.breakdown).map(([key, value]) => {
                                            const label = {
                                                baseCost: 'Base Cost',
                                                materialsCost: 'Materials',
                                                furnitureCost: 'Furniture',
                                                laborCost: 'Labor',
                                                designFee: 'Design Fee'
                                            }[key];

                                            const percentage = Math.round((value / result.totalCost) * 100);

                                            return (
                                                <div key={key} className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex justify-between mb-1">
                                                            <span>{label}</span>
                                                            <span>${Math.round(value).toLocaleString()}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-primary rounded-full h-2"
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2">Time Estimate</h3>
                                    <p className="text-gray-600">
                                        {result.timeEstimate.min === result.timeEstimate.max ?
                                            `Approximately ${result.timeEstimate.min} weeks` :
                                            `${result.timeEstimate.min}-${result.timeEstimate.max} weeks`
                                        }
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href="/consultation"
                                        className="block w-full bg-accent hover:bg-primary text-white text-center py-3 rounded-lg transition-colors font-semibold"
                                    >
                                        Book a Consultation
                                    </Link>

                                    <button
                                        onClick={() => {
                                            const subject = `Interior Design Quote for ${roomTypes.find(r => r.id === roomType)?.name}`;
                                            const body = `I'd like to discuss a project with an estimated budget of $${Math.round(result.totalCost).toLocaleString()} for my ${roomTypes.find(r => r.id === roomType)?.name} (${result.area} sq ft)`;
                                            window.open(`mailto:info@pradeepinteriors.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                                        }}
                                        className="block w-full mt-3 border border-primary text-primary hover:bg-primary hover:text-white text-center py-3 rounded-lg transition-colors font-semibold"
                                    >
                                        Email This Quote
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 