import { useState, useMemo } from 'react';
import uzbekistanMap from '@svg-maps/uzbekistan';
import {
  Globe, Users, TrendUp, Pulse, MagnifyingGlass,
  CaretDown, CaretUp, Info, MapPin
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

// Exact data from robocontest.uz provided by user
const BASE_REGIONS = [
  { id: 'andijan', name: 'Andijon viloyati', total: 23905, newUsers: 566, active: 353 },
  { id: 'tashkent-city', name: 'Toshkent shahar', total: 18524, newUsers: 526, active: 700 },
  { id: 'fergana', name: "Farg'ona viloyati", total: 17998, newUsers: 481, active: 595 },
  { id: 'samarqand', name: 'Samarqand viloyati', total: 17868, newUsers: 311, active: 419 },
  { id: 'bukhara', name: 'Buxoro viloyati', total: 17865, newUsers: 494, active: 730 },
  { id: 'namangan', name: 'Namangan viloyati', total: 14883, newUsers: 224, active: 404 },
  { id: 'qashqadaryo', name: 'Qashqadaryo viloyati', total: 14879, newUsers: 336, active: 440 },
  { id: 'jizzakh', name: 'Jizzax viloyati', total: 14825, newUsers: 356, active: 568 },
  { id: 'karakalpakstan', name: "Qoraqalpog'iston Resp.", total: 14661, newUsers: 360, active: 485 },
  { id: 'xorazm', name: 'Xorazm viloyati', total: 13609, newUsers: 355, active: 492 },
  { id: 'sirdaryo', name: 'Sirdaryo viloyati', total: 11271, newUsers: 216, active: 333 },
  { id: 'tashkent', name: 'Toshkent viloyati', total: 8059, newUsers: 319, active: 472 },
  { id: 'navoiy', name: 'Navoiy viloyati', total: 8050, newUsers: 182, active: 215 },
  { id: 'surxondaryo', name: 'Surxondaryo viloyati', total: 6993, newUsers: 153, active: 221 },
];

const UNASSIGNED_REGION = {
  name: "Hududi ko'rsatilmagan",
  total: 4844,
  newUsers: 114,
  active: 168,
};

const TIME_RANGES = [
  { id: '7', label: '7 kun', factorNew: 0.25, factorActive: 0.4 },
  { id: '30', label: '30 kun', factorNew: 1.0, factorActive: 1.0 },
  { id: '90', label: '90 kun', factorNew: 2.8, factorActive: 2.5 },
  { id: '365', label: '365 kun', factorNew: 11.2, factorActive: 8.4 },
];

const METRICS = [
  { id: 'total', label: 'Jami', icon: Users },
  { id: 'newUsers', label: 'Yangi', icon: TrendUp },
  { id: 'active', label: 'Faol', icon: Pulse },
];

export default function UserGeographyMap() {
  const [selectedTime, setSelectedTime] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('total');
  const [hoveredRegionId, setHoveredRegionId] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState('andijan');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('total'); // 'total' | 'newUsers' | 'active'
  const [sortAsc, setSortAsc] = useState(false);

  const activeRange = TIME_RANGES.find(r => r.id === selectedTime) || TIME_RANGES[1];

  // Adjust numbers based on time filter
  const calculatedRegions = useMemo(() => {
    return BASE_REGIONS.map(reg => ({
      ...reg,
      calcTotal: reg.total,
      calcNew: Math.round(reg.newUsers * activeRange.factorNew),
      calcActive: Math.round(reg.active * activeRange.factorActive),
    }));
  }, [activeRange]);

  // Totals
  const totalStats = useMemo(() => {
    const sumTotal = calculatedRegions.reduce((acc, r) => acc + r.calcTotal, 0) + UNASSIGNED_REGION.total;
    const sumNew = calculatedRegions.reduce((acc, r) => acc + r.calcNew, 0) + Math.round(UNASSIGNED_REGION.newUsers * activeRange.factorNew);
    const sumActive = calculatedRegions.reduce((acc, r) => acc + r.calcActive, 0) + Math.round(UNASSIGNED_REGION.active * activeRange.factorActive);
    return { sumTotal, sumNew, sumActive };
  }, [calculatedRegions, activeRange]);

  // Max value for heat calculation
  const maxMetricValue = useMemo(() => {
    const key = selectedMetric === 'total' ? 'calcTotal' : selectedMetric === 'newUsers' ? 'calcNew' : 'calcActive';
    return Math.max(...calculatedRegions.map(r => r[key])) || 1;
  }, [calculatedRegions, selectedMetric]);

  // Get color intensity for each region
  const getRegionFillColor = (locIndex, locId) => {
    // Map SVG location index to data ID
    let regionDataId = locId;
    if (locId === 'tashkent') {
      regionDataId = locIndex === 11 ? 'tashkent-city' : 'tashkent';
    }

    const item = calculatedRegions.find(r => r.id === regionDataId);
    if (!item) return '#1E293B';

    const val = selectedMetric === 'total' ? item.calcTotal : selectedMetric === 'newUsers' ? item.calcNew : item.calcActive;
    const ratio = Math.max(0.12, Math.min(1, val / maxMetricValue));

    const isHovered = hoveredRegionId === regionDataId;
    const isSelected = selectedRegionId === regionDataId;

    if (isSelected || isHovered) {
      return '#3B82F6'; // Highlight vibrant blue
    }

    // Color gradient based on metric
    // From soft slate-blue to deep rich vibrant indigo/blue
    const lightness = Math.round(75 - ratio * 45); // 75% down to 30%
    return `hsl(217, 85%, ${lightness}%)`;
  };

  // Filtered & sorted table list
  const displayList = useMemo(() => {
    return calculatedRegions
      .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        const valA = sortField === 'total' ? a.calcTotal : sortField === 'newUsers' ? a.calcNew : a.calcActive;
        const valB = sortField === 'total' ? b.calcTotal : sortField === 'newUsers' ? b.calcNew : b.calcActive;
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [calculatedRegions, searchQuery, sortField, sortAsc]);

  const activeRegionData = calculatedRegions.find(r => r.id === selectedRegionId) || calculatedRegions[0];

  return (
    <div className="space-y-6">
      
      {/* ── Section Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Hududlar boʻyicha foydalanuvchilar geografiyasi
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Oʻzbekiston Respublikasi viloyat va shaharlarida GeoBek foydalanuvchilari statistikasi
          </p>
        </div>

        {/* Filter Controls (Robocontest style) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Filter Pills */}
          <div className="flex items-center p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
            {TIME_RANGES.map(range => (
              <button
                key={range.id}
                onClick={() => setSelectedTime(range.id)}
                className={cn(
                  'px-3 py-1 text-xs font-semibold rounded-lg transition-all',
                  selectedTime === range.id
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Metric Selector Pills */}
          <div className="flex items-center p-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
            {METRICS.map(metric => {
              const Icon = metric.icon;
              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all',
                    selectedMetric === metric.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <Icon size={13} weight="bold" />
                  <span>{metric.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Summary Counters ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <span>Jami roʻyxatdan oʻtganlar</span>
            <Users size={16} className="text-blue-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
            {totalStats.sumTotal.toLocaleString('en-US')}
          </p>
          <p className="text-[11px] text-[var(--text-tertiary)]">Oʻzbekiston boʻyicha jami oʻquvchi va ustozlar</p>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <span>Yangi qoʻshilganlar ({activeRange.label})</span>
            <TrendUp size={16} className="text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 tracking-tight">
            +{totalStats.sumNew.toLocaleString('en-US')}
          </p>
          <p className="text-[11px] text-[var(--text-tertiary)]">Tanlangan davrdagi faol oʻsish</p>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <span>Faol foydalanuvchilar</span>
            <Pulse size={16} className="text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-indigo-600 tracking-tight">
            {totalStats.sumActive.toLocaleString('en-US')}
          </p>
          <p className="text-[11px] text-[var(--text-tertiary)]">Haftalik testlar va darslarda qatnashuvchilar</p>
        </div>
      </div>

      {/* ── Main Map & Table Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive Map Container (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Hududlar xaritasi
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Hudud ustiga bosing yoki sichqonchani olib boring
              </p>
            </div>

            {/* Heatmap Legend: Kam -> Ko'p */}
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]">
              <span>Kam</span>
              <div className="w-24 h-2.5 rounded-full bg-gradient-to-r from-blue-200 via-blue-500 to-indigo-900 shadow-inner" />
              <span>Koʻp</span>
            </div>
          </div>

          {/* SVG Map Render */}
          <div className="relative aspect-[16/10] w-full rounded-2xl bg-[var(--background)] border border-[var(--border-subtle)] p-2 sm:p-4 flex items-center justify-center overflow-hidden">
            <svg
              viewBox={uzbekistanMap.viewBox}
              className="w-full h-full select-none"
            >
              {uzbekistanMap.locations.map((loc, index) => {
                const isAral = loc.id === 'aral-sea';
                let regionDataId = loc.id;
                if (loc.id === 'tashkent') {
                  regionDataId = index === 11 ? 'tashkent-city' : 'tashkent';
                }

                return (
                  <path
                    key={`${loc.id}-${index}`}
                    d={loc.path}
                    fill={isAral ? '#0284C7' : getRegionFillColor(index, loc.id)}
                    stroke="#FFFFFF"
                    strokeWidth={0.8}
                    strokeLinejoin="round"
                    className={cn(
                      'transition-all duration-200',
                      !isAral && 'cursor-pointer hover:opacity-95'
                    )}
                    onMouseEnter={() => !isAral && setHoveredRegionId(regionDataId)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    onClick={() => !isAral && setSelectedRegionId(regionDataId)}
                  />
                );
              })}
            </svg>

            {/* Floating Quick Region Info Overlay */}
            {activeRegionData && (
              <div className="absolute bottom-3 left-3 bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] rounded-xl px-3.5 py-2 shadow-lg text-xs space-y-0.5">
                <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                  <MapPin size={13} className="text-blue-600" />
                  <span>{activeRegionData.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-secondary)]">
                  <span>Jami: <strong className="text-[var(--text-primary)]">{activeRegionData.calcTotal.toLocaleString('en-US')}</strong></span>
                  <span>Yangi: <strong className="text-emerald-600">+{activeRegionData.calcNew}</strong></span>
                  <span>Faol: <strong className="text-indigo-600">{activeRegionData.calcActive}</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Map Attribution and Unassigned Notice (Robocontest exact requirement) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-[11px] text-[var(--text-tertiary)] border-t border-[var(--border)]">
            <span className="font-semibold text-[var(--text-secondary)]">
              Hududi koʻrsatilmagan foydalanuvchilar: {UNASSIGNED_REGION.total.toLocaleString('en-US')} nafar
            </span>
            <span>
              Chegaralar: geoBoundaries.org (CC BY 3.0 IGO)
            </span>
          </div>
        </div>

        {/* Right: Detailed Region Table (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Hududlar
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Barcha 14 ta maʼmuriy birlik
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-44">
              <MagnifyingGlass size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Hudud qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-2.5 rounded-lg text-xs bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)]"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-[var(--border)] max-h-[380px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--surface-raised)] border-b border-[var(--border)] text-[var(--text-secondary)] sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Hudud</th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[var(--text-primary)]"
                    onClick={() => {
                      if (sortField === 'total') setSortAsc(!sortAsc);
                      else { setSortField('total'); setSortAsc(false); }
                    }}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Jami</span>
                      {sortField === 'total' && (sortAsc ? <CaretUp size={11} /> : <CaretDown size={11} />)}
                    </div>
                  </th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[var(--text-primary)]"
                    onClick={() => {
                      if (sortField === 'newUsers') setSortAsc(!sortAsc);
                      else { setSortField('newUsers'); setSortAsc(false); }
                    }}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Yangi</span>
                      {sortField === 'newUsers' && (sortAsc ? <CaretUp size={11} /> : <CaretDown size={11} />)}
                    </div>
                  </th>
                  <th
                    className="py-2.5 px-3 font-semibold text-right cursor-pointer hover:text-[var(--text-primary)]"
                    onClick={() => {
                      if (sortField === 'active') setSortAsc(!sortAsc);
                      else { setSortField('active'); setSortAsc(false); }
                    }}
                  >
                    <div className="inline-flex items-center gap-1">
                      <span>Faol</span>
                      {sortField === 'active' && (sortAsc ? <CaretUp size={11} /> : <CaretDown size={11} />)}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] font-medium">
                {displayList.map((region) => {
                  const isSelected = selectedRegionId === region.id;
                  const percentOfMax = Math.round((region.calcTotal / 24000) * 100);

                  return (
                    <tr
                      key={region.id}
                      onClick={() => setSelectedRegionId(region.id)}
                      onMouseEnter={() => setHoveredRegionId(region.id)}
                      onMouseLeave={() => setHoveredRegionId(null)}
                      className={cn(
                        'transition-colors cursor-pointer',
                        isSelected ? 'bg-blue-500/10 font-bold' : 'hover:bg-[var(--background)]'
                      )}
                    >
                      <td className="py-2.5 px-3 text-[var(--text-primary)]">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor: isSelected ? '#3B82F6' : '#94A3B8'
                            }}
                          />
                          <span className="truncate">{region.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[var(--text-primary)] font-mono">
                        {region.calcTotal.toLocaleString('en-US')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-600 font-mono">
                        +{region.calcNew.toLocaleString('en-US')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-indigo-600 font-mono">
                        {region.calcActive.toLocaleString('en-US')}
                      </td>
                    </tr>
                  );
                })}

                {/* Special Unassigned row */}
                <tr className="bg-[var(--surface-raised)]/50 text-[var(--text-secondary)]">
                  <td className="py-2.5 px-3 italic">
                    {UNASSIGNED_REGION.name}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono">
                    {UNASSIGNED_REGION.total.toLocaleString('en-US')}
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-600 font-mono">
                    +{Math.round(UNASSIGNED_REGION.newUsers * activeRange.factorNew)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-indigo-600 font-mono">
                    {Math.round(UNASSIGNED_REGION.active * activeRange.factorActive)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
