import React, { useState, useEffect } from 'react';
import { Search, Car, Zap, TrendingDown, Landmark, ShoppingCart, ExternalLink, X, ChevronLeft, ChevronRight, Eye, Info } from 'lucide-react';

// --- DATABASE & LOGIC ---
const carData = {
  "Toyota": { models: ["4Runner", "Camry", "Corolla", "Highlander", "RAV4", "Tacoma", "Tundra"], base: 38000 },
  "Honda": { models: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey"], base: 34000 },
  "Ford": { models: ["F-150", "Mustang", "Explorer", "Ranger"], base: 48000 },
  "BMW": { models: ["3 Series", "5 Series", "X3", "X5", "M4"], base: 58000 },
  "Tesla": { models: ["Model 3", "Model Y", "Model S", "Model X"], base: 50000 }
};

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);

// --- MAIN APP ---
export default function CarScopeApp() {
  const [filters, setFilters] = useState({ make: 'Toyota', model: 'Tacoma', year: 2022, price: 32000 });
  const [valuation, setValuation] = useState({ wholesale: 35000, tradeIn: 38000, retail: 41000 });
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [hoveredImg, setHoveredImg] = useState(null);

  // Update Valuation on change
  useEffect(() => {
    if (filters.make) {
      const baseMSRP = carData[filters.make].base;
      const age = 2025 - filters.year;
      const currentRetail = baseMSRP * Math.pow(0.89, age);
      setValuation({
        retail: Math.round(currentRetail),
        tradeIn: Math.round(currentRetail * 0.83),
        wholesale: Math.round(currentRetail * 0.74)
      });
    }
  }, [filters.make, filters.year]);

  // Mock Result with Gallery Images
  const currentListing = {
    id: 1,
    title: `${filters.year} ${filters.make} ${filters.model}`,
    price: Number(filters.price),
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
    ]
  };

  const isGreatDeal = currentListing.price <= valuation.wholesale;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg"><Zap size={24} className="fill-white text-white"/></div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">CAR<span className="text-blue-500">SCOPE</span></h1>
          </div>
          <div className="text-[10px] font-bold text-slate-500 tracking-widest border border-slate-800 px-3 py-1 rounded-full uppercase">Sourcing v2.0</div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* SEARCH BAR PANEL */}
          <div className="lg:col-span-4 bg-[#161c2d] border border-slate-800 rounded-3xl p-6 h-fit sticky top-8">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Filter Listing</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Vehicle Make</label>
                <select className="w-full bg-[#0b0f1a] border border-slate-700 rounded-xl p-3 mt-1 outline-none focus:border-blue-500" value={filters.make} onChange={e => setFilters({...filters, make: e.target.value})}>
                  {Object.keys(carData).map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Year</label>
                  <select className="w-full bg-[#0b0f1a] border border-slate-700 rounded-xl p-3 mt-1 outline-none" value={filters.year} onChange={e => setFilters({...filters, year: e.target.value})}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Price</label>
                  <input type="number" className="w-full bg-[#0b0f1a] border border-slate-700 rounded-xl p-3 mt-1 outline-none text-white font-bold" value={filters.price} onChange={e => setFilters({...filters, price: e.target.value})} />
                </div>
              </div>
            </div>
          </div>

          {/* SCOPE RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* VALUATION SUMMARY */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#161c2d] p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-2"><TrendingDown size={14}/> Wholesale</div>
                <div className="text-xl font-black text-white">${valuation.wholesale.toLocaleString()}</div>
              </div>
              <div className="bg-[#161c2d] p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-2"><Landmark size={14}/> Trade-In</div>
                <div className="text-xl font-black text-white">${valuation.tradeIn.toLocaleString()}</div>
              </div>
              <div className="bg-[#161c2d] p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase mb-2"><ShoppingCart size={14}/> Retail Market</div>
                <div className="text-xl font-black text-white">${valuation.retail.toLocaleString()}</div>
              </div>
            </div>

            {/* LISTING RESULT CARD */}
            <div className={`bg-[#161c2d] border-2 rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-6 transition-all duration-500 ${isGreatDeal ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.15)]' : 'border-slate-800'}`}>
              
              {/* Image with Hover Preview */}
              <div 
                className="relative w-full md:w-56 h-48 bg-[#0b0f1a] rounded-2xl overflow-hidden cursor-zoom-in group"
                onMouseEnter={() => setHoveredImg(currentListing.images[0])}
                onMouseLeave={() => setHoveredImg(null)}
                onClick={() => setSelectedGallery(currentListing)}
              >
                <img src={currentListing.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="text-white" size={32} />
                </div>
              </div>

              {/* Data */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest"><Info size={14}/> Market Status</div>
                <h3 className="text-3xl font-black text-white tracking-tighter">{currentListing.title}</h3>
                <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                  <span>Automatic</span> • <span>Clean Title</span> • <span>Private Seller</span>
                </div>
                
                <div className="pt-4 flex items-center gap-4">
                  <div className={`text-4xl font-black tracking-tight ${isGreatDeal ? 'text-green-400' : 'text-white'}`}>
                    ${currentListing.price.toLocaleString()}
                  </div>
                  {isGreatDeal && <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/30">STEAL DETECTED</span>}
                </div>
              </div>

              <div className="pr-4">
                <a href="#" className="bg-blue-600 hover:bg-blue-500 text-white font-black p-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/40">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC COMPONENTS --- */}

        {/* Hover-Zoom Preview Popover */}
        {hoveredImg && (
          <div className="fixed top-24 right-10 w-[450px] h-72 border-4 border-blue-500 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-[60] pointer-events-none animate-in fade-in zoom-in duration-200">
            <img src={hoveredImg} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 text-[10px] font-black text-white text-center uppercase tracking-[0.3em]">
              High-Res Scan Preview
            </div>
          </div>
        )}

        {/* Lightbox Gallery */}
        {selectedGallery && (
          <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
            <button onClick={() => setSelectedGallery(null)} className="absolute top-8 right-8 text-white hover:text-blue-500 transition-colors"><X size={48} /></button>
            <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
              <button onClick={() => setImgIndex(prev => (prev - 1 + selectedGallery.images.length) % selectedGallery.images.length)} className="absolute left-0 bg-white/10 p-4 rounded-full hover:bg-blue-600 transition-all"><ChevronLeft size={32}/></button>
              <img src={selectedGallery.images[imgIndex]} className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-white/10" />
              <button onClick={() => setImgIndex(prev => (prev + 1) % selectedGallery.images.length)} className="absolute right-0 bg-white/10 p-4 rounded-full hover:bg-blue-600 transition-all"><ChevronRight size={32}/></button>
            </div>
            <div className="mt-10 flex gap-4">
              {selectedGallery.images.map((img, i) => (
                <img key={i} src={img} onClick={() => setImgIndex(i)} className={`w-24 h-16 object-cover rounded-xl cursor-pointer border-2 transition-all ${imgIndex === i ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/40' : 'border-transparent opacity-40 hover:opacity-100'}`} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
