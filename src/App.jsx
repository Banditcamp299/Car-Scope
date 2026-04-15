import React, { useState, useEffect } from 'react';
import { Search, Car, Zap, TrendingDown, Landmark, ShoppingCart, ExternalLink, Info, Filter, ArrowUpRight, Gauge, MapPin } from 'lucide-react';

// --- MASSIVE CANADIAN MARKET DATABASE ---
const carDatabase = {
  "Acura": ["ILX", "Integra", "MDX", "NSX", "RDX", "RLX", "TLX", "TSX"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "RS5", "RS6", "S4", "S5", "TT"],
  "BMW": ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "M2", "M3", "M4", "M5", "Z4"],
  "Chevrolet": ["Blazer", "Bolt", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado 1500", "Silverado 2500", "Suburban", "Tahoe", "Traverse"],
  "Dodge": ["Challenger", "Charger", "Durango", "Grand Caravan", "Ram 1500"],
  "Ford": ["Bronco", "Bronco Sport", "Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250", "Fiesta", "Focus", "Fusion", "Mustang", "Ranger"],
  "GMC": ["Acadia", "Canyon", "Sierra 1500", "Sierra 2500", "Terrain", "Yukon"],
  "Honda": ["Accord", "Civic", "CR-V", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  "Hyundai": ["Elantra", "Ioniq 5", "Ioniq 6", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Venue"],
  "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wrangler"],
  "Kia": ["Ev6", "Forte", "Niro", "Rio", "Seltos", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"],
  "Lexus": ["ES", "GS", "GX", "IS", "LS", "LX", "NX", "RC", "RX", "UX"],
  "Mazda": ["CX-3", "CX-30", "CX-5", "CX-50", "CX-9", "Mazda3", "Mazda6", "MX-5 Miata"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Wagon", "SL"],
  "Nissan": ["Altima", "Ariya", "Frontier", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Qashqai", "Rogue", "Sentra", "Titan", "Z"],
  "Porsche": ["911", "718 Boxster", "718 Cayman", "Cayenne", "Macan", "Panamera", "Taycan"],
  "Subaru": ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"],
  "Toyota": ["4Runner", "86", "Avalon", "Camry", "Corolla", "Corolla Cross", "Highlander", "Prius", "RAV4", "Sequoia", "Sienna", "Supra", "Tacoma", "Tundra", "Venza"],
  "Volkswagen": ["Atlas", "Golf", "GTI", "ID.4", "Jetta", "Passat", "Taos", "Tiguan"],
  "Volvo": ["S60", "S90", "V60", "XC40", "XC60", "XC90"]
};

const years = Array.from({ length: 35 }, (_, i) => 2025 - i);

export default function CarScopeApp() {
  const [filters, setFilters] = useState({ make: '', model: '', year: 2021, price: '' });
  const [valuation, setValuation] = useState({ wholesale: 0, tradeIn: 0, retail: 0 });

  useEffect(() => {
    if (filters.make && filters.year) {
      const age = 2025 - filters.year;
      let baseMSRP = 42000;
      if (["BMW", "Porsche", "Mercedes-Benz", "Lexus", "Tesla", "Audi"].includes(filters.make)) baseMSRP = 72000;
      if (["Toyota", "Honda", "Subaru"].includes(filters.make)) baseMSRP = 39000;
      
      const currentRetail = baseMSRP * Math.pow(0.885, age);
      setValuation({
        retail: Math.round(currentRetail),
        tradeIn: Math.round(currentRetail * 0.83),
        wholesale: Math.round(currentRetail * 0.74)
      });
    }
  }, [filters.make, filters.year]);

  // Deep Link Generators for Kijiji and AutoTrader
  const getKijijiUrl = () => {
    const query = `${filters.year}+${filters.make}+${filters.model}`.replace(/\s+/g, '+');
    return `https://www.kijiji.ca/b-cars-vehicles/canada/${query}/k0c174l0`;
  };

  const getAutoTraderUrl = () => {
    return `https://www.autotrader.ca/cars/${filters.make}/${filters.model}/?rcp=15&rcs=0&srt=3&yrl=${filters.year}&yrh=${filters.year}&prx=-1&loc=Canada`;
  };

  const isDeal = filters.price && filters.price <= valuation.wholesale;

  return (
    <div className="min-h-screen bg-[#080a11] text-slate-200 font-sans p-2 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between mb-8 px-4 py-3 bg-[#111522] border border-slate-800 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg"><Zap size={22} className="fill-white text-white"/></div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">CAR<span className="text-blue-500">SCOPE</span></h1>
          </div>
          <div className="hidden md:flex gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="text-blue-500 underline decoration-2 underline-offset-8">Sourcing</span>
            <span className="hover:text-white cursor-pointer transition-colors">Market Trends</span>
            <span className="hover:text-white cursor-pointer transition-colors">Inventory</span>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold px-4 py-2 rounded-lg border border-slate-700 transition-all">LOGOUT</button>
        </nav>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-[#111522] border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <Filter size={14}/> Quick Filter
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest">Make</label>
                  <select className="w-full bg-[#080a11] border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-all"
                    value={filters.make} onChange={e => setFilters({...filters, make: e.target.value, model: ''})}>
                    <option value="">Select Manufacturer</option>
                    {Object.keys(carDatabase).sort().map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest">Model</label>
                  <select className="w-full bg-[#080a11] border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none disabled:opacity-20 transition-all"
                    disabled={!filters.make} value={filters.model} onChange={e => setFilters({...filters, model: e.target.value})}>
                    <option value="">Select Model</option>
                    {filters.make && carDatabase[filters.make].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest">Year</label>
                    <select className="w-full bg-[#080a11] border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                      value={filters.year} onChange={e => setFilters({...filters, year: e.target.value})}>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase mb-2 block tracking-widest">Price</label>
                    <input type="number" placeholder="$" className="w-full bg-[#080a11] border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                      value={filters.price} onChange={e => setFilters({...filters, price: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">PRO TIP</h4>
                 <p className="text-sm font-bold leading-snug">Wholesale prices represent auction-grade buy-ins. Aim for green tags.</p>
               </div>
               <Zap className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-125 transition-transform" size={120} />
            </div>
          </div>

          {/* MAIN SECTION: LISTINGS & DASHBOARD */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* VALUE METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#111522] border border-slate-800 p-5 rounded-3xl shadow-lg group hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Wholesale</div>
                  <TrendingDown size={14} className="text-green-500"/>
                </div>
                <div className="text-3xl font-black text-white italic">${valuation.wholesale.toLocaleString()}</div>
              </div>
              <div className="bg-[#111522] border border-slate-800 p-5 rounded-3xl shadow-lg group hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trade-In</div>
                  <Landmark size={14} className="text-blue-500"/>
                </div>
                <div className="text-3xl font-black text-white italic">${valuation.tradeIn.toLocaleString()}</div>
              </div>
              <div className="bg-[#111522] border border-slate-800 p-5 rounded-3xl shadow-lg group hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Retail</div>
                  <ShoppingCart size={14} className="text-yellow-500"/>
                </div>
                <div className="text-3xl font-black text-white italic">${valuation.retail.toLocaleString()}</div>
              </div>
            </div>

            {/* LIVE SOURCING COMMANDS */}
            <div className="bg-[#111522] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                <div>
                  <h3 className="text-lg font-black text-white uppercase italic">Active Search Console</h3>
                  <p className="text-xs text-slate-500 font-medium">Scoping {filters.year} {filters.make} {filters.model || 'Inventory'}</p>
                </div>
                <div className="flex gap-2">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                   <div className="text-[9px] font-bold text-slate-500 uppercase">Live Sourcing Enabled</div>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-4">
                <a href={getKijijiUrl()} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-[#080a11] border border-slate-800 rounded-3xl hover:border-blue-600 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-3 rounded-2xl group-hover:bg-blue-600 transition-all"><Search size={24}/></div>
                    <div>
                      <div className="text-white font-black text-lg group-hover:text-blue-500 transition-all">KIJIJI CANADA</div>
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Private & Dealer Feed</div>
                    </div>
                  </div>
                  <ArrowUpRight className="text-slate-700 group-hover:text-white transition-all"/>
                </a>

                <a href={getAutoTraderUrl()} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 bg-[#080a11] border border-slate-800 rounded-3xl hover:border-red-600 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-3 rounded-2xl group-hover:bg-red-600 transition-all"><Car size={24}/></div>
                    <div>
                      <div className="text-white font-black text-lg group-hover:text-red-500 transition-all">AUTOTRADER.CA</div>
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Premium Market Feed</div>
                    </div>
                  </div>
                  <ArrowUpRight className="text-slate-700 group-hover:text-white transition-all"/>
                </a>
              </div>

              {/* LISTING COMPARISON AREA (Simulated Listing) */}
              <div className="p-8 pt-0">
                <div className={`p-1 bg-gradient-to-r ${isDeal ? 'from-green-500 to-emerald-500' : 'from-slate-800 to-slate-900'} rounded-[2rem]`}>
                  <div className="bg-[#080a11] rounded-[1.9rem] p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-44 h-32 bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                       <Car size={40} className="text-slate-800" />
                       <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-1">
                         <MapPin size={8}/> CANADA
                       </div>
                    </div>
                    <div className="flex-1 space-y-1">
                       <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Candidate Analysis</div>
                       <h4 className="text-2xl font-black text-white italic">{filters.year} {filters.make} {filters.model || '...'}</h4>
                       <div className="flex gap-4 text-slate-500 text-[10px] font-bold uppercase">
                          <span className="flex items-center gap-1"><Gauge size={12}/> Verified Mileage Needed</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className={`text-4xl font-black italic tracking-tighter ${isDeal ? 'text-green-400' : 'text-white'}`}>
                        ${filters.price ? Number(filters.price).toLocaleString() : '---'}
                       </div>
                       <div className="text-[10px] font-black text-slate-600 uppercase mt-1">
                        {isDeal ? 'BELOW WHOLESALE - BUY NOW' : 'MARKET PRICED'}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
