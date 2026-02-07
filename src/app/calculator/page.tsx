'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCalculateBudget } from '@/src/hooks/query/useCalculator';

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
const furnitureByRoomType: any = {
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
    const [selectedMaterials, setSelectedMaterials] = useState<any[]>([]);
    const [selectedFurniture, setSelectedFurniture] = useState<any[]>([]);

    const calculateMutation = useCalculateBudget();

    // Handle dimension change
    const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDimensions({
            ...dimensions,
            [name]: parseFloat(value) || 0
        });
    };

    // Handle room type change
    const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRoomType(e.target.value);
        setSelectedFurniture([]);
    };

    // ... (rest of selection handlers remain same) ...
    const handleMaterialToggle = (materialId: string) => {
        const existingIndex = selectedMaterials.findIndex(m => m.type === materialId);
        if (existingIndex >= 0) {
            setSelectedMaterials(selectedMaterials.filter(m => m.type !== materialId));
        } else {
            const material: any = materialOptions.find(m => m.id === materialId);
            const category = material.category;
            const existingCategoryMaterial = selectedMaterials.find(m => {
                const mat: any = materialOptions.find(opt => opt.id === m.type);
                return mat && mat.category === category;
            });
            if (existingCategoryMaterial && ['WALL', 'FLOOR', 'CEILING'].includes(category)) {
                setSelectedMaterials([
                    ...selectedMaterials.filter(m => {
                        const mat: any = materialOptions.find(opt => opt.id === m.type);
                        return mat && mat.category !== category;
                    }),
                    { type: materialId, coverage: 1 }
                ]);
            } else {
                setSelectedMaterials([...selectedMaterials, { type: materialId, coverage: 1 }]);
            }
        }
    };

    const handleFurnitureToggle = (furnitureId: string) => {
        const existingIndex = selectedFurniture.findIndex(f => f.type === furnitureId);
        if (existingIndex >= 0) {
            setSelectedFurniture(selectedFurniture.filter(f => f.type !== furnitureId));
        } else {
            const furniture = furnitureByRoomType[roomType].find((f: any) => f.id === furnitureId);
            setSelectedFurniture([...selectedFurniture, {
                type: furnitureId,
                quantity: 1,
                price: furniture ? furniture.price : 0
            }]);
        }
    };

    const handleFurnitureQuantityChange = (furnitureId: string, quantity: string) => {
        const updatedFurniture = selectedFurniture.map(item => {
            if (item.type === furnitureId) {
                return { ...item, quantity: parseInt(quantity) || 1 };
            }
            return item;
        });
        setSelectedFurniture(updatedFurniture);
    };

    // Calculate budget
    const handleCalculate = async () => {
        calculateMutation.mutate({
            dimensions,
            roomType,
            materials: selectedMaterials,
            furniture: selectedFurniture
        });
    };

    const result = calculateMutation.data;

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Budget Calculator</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Use our interactive calculator to estimate the cost of your interior design project.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Room Information */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Room Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Room Type</label>
                                <select className="w-full px-4 py-2 border rounded-lg" value={roomType} onChange={handleRoomTypeChange}>
                                    {roomTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Length (ft)</label>
                                    <input type="number" name="length" min="1" value={dimensions.length} onChange={handleDimensionChange} className="w-full px-4 py-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Width (ft)</label>
                                    <input type="number" name="width" min="1" value={dimensions.width} onChange={handleDimensionChange} className="w-full px-4 py-2 border rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Materials Selection */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Materials</h2>
                        <div className="space-y-6">
                            {['WALL', 'FLOOR', 'CEILING', 'FIXTURE'].map(category => {
                                const materialsInCategory = materialOptions.filter(m => m.category === category);
                                return (
                                    <div key={category} className="space-y-2">
                                        <h3 className="font-semibold text-gray-600">{category.charAt(0) + category.slice(1).toLowerCase()} Materials</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {materialsInCategory.map(material => {
                                                const isSelected = selectedMaterials.some(m => m.type === material.id);
                                                return (
                                                    <div key={material.id} onClick={() => handleMaterialToggle(material.id)} className={`p-3 border rounded-lg cursor-pointer flex items-center transition-colors ${isSelected ? 'bg-primary text-white border-primary shadow-sm' : 'hover:bg-gray-50'}`}>
                                                        <div className="flex-1">
                                                            <span className="block text-sm font-medium">{material.name}</span>
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
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-bold mb-4">Furniture</h2>
                        <div className="space-y-2">
                            {(furnitureByRoomType[roomType] || []).map((furniture: any) => {
                                const selectedFurnitureItem = selectedFurniture.find(f => f.type === furniture.id);
                                const isSelected = !!selectedFurnitureItem;
                                return (
                                    <div key={furniture.id} className={`border rounded-lg p-4 transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input type="checkbox" id={`furniture-${furniture.id}`} checked={isSelected} onChange={() => handleFurnitureToggle(furniture.id)} className="w-4 h-4 text-primary" />
                                                <label htmlFor={`furniture-${furniture.id}`} className="ml-3 cursor-pointer">
                                                    <span className="font-medium text-gray-800">{furniture.name}</span>
                                                    <span className="text-gray-500 ml-2">${furniture.price.toLocaleString()}</span>
                                                </label>
                                            </div>
                                            {isSelected && (
                                                <div className="flex items-center">
                                                    <label className="text-xs text-gray-500 mr-2 uppercase font-bold">Qty:</label>
                                                    <select value={selectedFurnitureItem.quantity} onChange={(e) => handleFurnitureQuantityChange(furniture.id, e.target.value)} className="border rounded-md px-2 py-1 text-sm bg-white" >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => <option key={num} value={num}>{num}</option>)}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <button onClick={handleCalculate} disabled={calculateMutation.isPending} className="bg-primary hover:bg-accent text-white py-4 px-12 rounded-lg font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50">
                            {calculateMutation.isPending ? 'Calculating Estimate...' : 'Calculate Budget'}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 pb-4 border-b">Budget Estimate</h2>

                        {calculateMutation.isError && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 text-sm font-medium border border-red-100">
                                {(calculateMutation.error as any)?.message || 'Calculation failed. Please try again.'}
                            </div>
                        )}

                        {!result && !calculateMutation.isError && (
                            <div className="text-center py-12 text-gray-400">
                                <p>Fill details and click calculate to see estimate.</p>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="bg-primary/5 p-6 rounded-2xl text-center border border-primary/10">
                                    <p className="text-gray-600 text-sm font-medium mb-1">Estimated Total</p>
                                    <h3 className="text-4xl font-black text-primary">${Math.round(result.totalCost).toLocaleString()}</h3>
                                    <p className="text-xs text-gray-400 mt-2 uppercase tracking-wide">For {result.area} sq ft space</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Breakdown</h3>
                                    {Object.entries(result.breakdown).map(([key, value]: [any, any]) => {
                                        const label = { baseCost: 'Design Base', materialsCost: 'Materials', furnitureCost: 'Furniture', laborCost: 'Labor', designFee: 'Design Fee' }[key];
                                        return (
                                            <div key={key} className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">{label}</span>
                                                    <span className="font-bold text-gray-900">${Math.round(value).toLocaleString()}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${(value / result.totalCost) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="pt-6 border-t border-dashed">
                                    <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-2">Completion Time</h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {result.timeEstimate.min === result.timeEstimate.max ? `${result.timeEstimate.min} Weeks` : `${result.timeEstimate.min}-${result.timeEstimate.max} Weeks`}
                                    </p>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <Link href="/consultation" className="block w-full bg-accent hover:bg-primary text-white text-center py-4 rounded-xl transition-all font-bold shadow-md">
                                        Book Consultation
                                    </Link>
                                    <button onClick={() => window.print()} className="block w-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-center py-3 rounded-xl transition-all text-sm font-medium">
                                        Save as PDF
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