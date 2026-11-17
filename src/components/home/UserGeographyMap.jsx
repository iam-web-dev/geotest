import { useState, useMemo } from 'react';
import uzbekistanMap from '@svg-maps/uzbekistan';
import {
  Globe, Users, TrendUp, Pulse, MagnifyingGlass,
  CaretDown, CaretUp, MapPin, X
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

// Exact regional data from robocontest.uz provided by user
const BASE_REGIONS = [
  { id: 'andijan', name: 'Andijon viloyati', total: 23905, newUsers: 566, active: 353 },
  { id: 'tashkent-city', name: 'Toshkent shahar', total: 18524, newUsers: 526, active: 700 },
  { id: 'fergana', name: "Fargʻona viloyati", total: 17998, newUsers: 481, active: 595 },
  { id: 'samarqand', name: 'Samarqand viloyati', total: 17868, newUsers: 311, active: 419 },
  { id: 'bukhara', name: 'Buxoro viloyati', total: 17865, newUsers: 494, active: 730 },
  { id: 'namangan', name: 'Namangan viloyati', total: 14883, newUsers: 224, active: 404 },
  { id: 'qashqadaryo', name: 'Qashqadaryo viloyati', total: 14879, newUsers: 336, active: 440 },
  { id: 'jizzakh', name: 'Jizzax viloyati', total: 14825, newUsers: 356, active: 568 },
  { id: 'karakalpakstan', name: "Qoraqalpogʻiston Resp.", total: 14661, newUsers: 360, active: 485 },
  { id: 'xorazm', name: 'Xorazm viloyati', total: 13609, newUsers: 355, active: 492 },
  { id: 'sirdaryo', name: 'Sirdaryo viloyati', total: 11271, newUsers: 216, active: 333 },
  { id: 'tashkent', name: 'Toshkent viloyati', total: 8059, newUsers: 319, active: 472 },
  { id: 'navoiy', name: 'Navoiy viloyati', total: 8050, newUsers: 182, active: 215 },
  { id: 'surxondaryo', name: 'Surxondaryo viloyati', total: 6993, newUsers: 153, active: 221 },
];

const UNASSIGNED_REGION = {
  name: "Hududi koʻrsatilmagan",
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
  { id: 'total', label: 'Jami', icon: Users, desc: 'Jami foydalanuvchilar' },
  { id: 'newUsers', label: 'Yangi', icon: TrendUp, desc: 'Yangi roʻyxatdan oʻtganlar' },
  { id: 'active', label: 'Faol', icon: Pulse, desc: 'Faol foydalanuvchilar' },
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

  // Overall totals across Republic
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

    if (isSelected) {
      return '#2563EB'; // Vibrant primary blue
    }
    if (isHovered) {
      return '#38BDF8'; // Bright sky blue
    }

    // Color gradient based on metric density
    // Darker/richer blue for higher density, soft pastel sky for lower
    const lightness = Math.round(78 - ratio * 46); // 78% down to 32%
    return `hsl(217, 85%, ${lightness}%)`;
  };

  // Filtered & sorted table list
  const displayList = useMemo(() => {
    return calculatedRegions
      .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
      .sort((a, b) => {
        const valA = sortField === 'total' ? a.calcTotal : sortField === 'newUsers' ? a.calcNew : a.calcActive;
        const valB = sortField === 'total' ? b.calcTotal : sortField === 'newUsers' ? b.calcNew : b.calcActive;
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [calculatedRegions, searchQuery, sortField, sortAsc]);

  const activeRegionData = calculatedRegions.find(r => r.id === selectedRegionId) || calculatedRegions[0];
  const activeRegionRank = useMemo(() => {
    const sorted = [...calculatedRegions].sort((a, b) => b.calcTotal - a.calcTotal);
    return sorted.findIndex(r => r.id === selectedRegionId) + 1;
  }, [calculatedRegions, selectedRegionId]);

  return (
    <section className="space-y-6">
      
      {/* ── Section Header ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
              Hududlar boʻyicha foydalanuvchilar geografiyasi
            </h2>
          </div>
        </div>

        {/* ── Filter Controls Bar (Clean & Minimalist) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--surface)] p-2.5 rounded-xl border border-[var(--border)]">
          {/* Time Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
            <span className="text-xs font-medium text-[var(--text-tertiary)] mr-1 hidden md:inline">Davr:</span>
            {TIME_RANGES.map(range => {
              const isSelected = selectedTime === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => setSelectedTime(range.id)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0',
                    isSelected
                      ? 'bg-[var(--primary)] text-white shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background)]'
                  )}
                >
                  {range.label}
                </button>
              );
            })}
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
            <span className="text-xs font-medium text-[var(--text-tertiary)] mr-1 hidden md:inline">Metrika:</span>
            {METRICS.map(metric => {
              const Icon = metric.icon;
              const isSelected = selectedMetric === metric.id;
              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0',
                    isSelected
                      ? 'bg-[var(--primary)] text-white shadow-2xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background)]'
                  )}
                >
                  <Icon size={14} weight="bold" />
                  <span>{metric.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Summary Counters Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-1.5 hover:border-[var(--primary)]/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <span>Jami foydalanuvchilar</span>
            <div className="size-7 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center">
              <Users size={16} weight="bold" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tabular-nums tracking-tight">
            {totalStats.sumTotal.toLocaleString('en-US')}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-1.5 hover:border-[var(--primary)]/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <span>Yangi qoʻshilganlar ({activeRange.label})</span>
            <div className="size-7 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center">
              <TrendUp size={16} weight="bold" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tabular-nums tracking-tight">
            +{totalStats.sumNew.toLocaleString('en-US')}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-1.5 hover:border-[var(--primary)]/40 transition-colors">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
            <span>Faol ishtirokchilar</span>
            <div className="size-7 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center">
              <Pulse size={16} weight="bold" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tabular-nums tracking-tight">
            {totalStats.sumActive.toLocaleString('en-US')}
          </p>
        </div>
      </div>

      {/* ── Interactive Map Box (Clean & Balanced) ── */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 space-y-5">
        
        {/* Map Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>Oʻzbekiston Respublikasi interaktiv xaritasi</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Viloyat ustiga bosib, koʻrsatkichlarni tekshiring
            </p>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--text-secondary)] font-medium self-start sm:self-auto shrink-0">
            <span className="text-[11px]">Kam</span>
            <div className="w-24 sm:w-32 h-2 rounded-full bg-gradient-to-r from-blue-100 to-[#1E5BF8]" />
            <span className="text-[11px]">Koʻp</span>
          </div>
        </div>

        {/* SVG Map Canvas */}
        <div className="relative rounded-xl bg-[var(--background)] border border-[var(--border)] p-4 sm:p-6 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-2xl py-2">
            <svg
              viewBox={uzbekistanMap.viewBox}
              className="w-full h-auto select-none"
              style={{ maxHeight: '420px' }}
            >
              {uzbekistanMap.locations.map((loc, index) => {
                const isAral = loc.id === 'aral-sea';
                let regionDataId = loc.id;
                if (loc.id === 'tashkent') {
                  regionDataId = index === 11 ? 'tashkent-city' : 'tashkent';
                }

                const isSelected = selectedRegionId === regionDataId;

                return (
                  <path
                    key={`${loc.id}-${index}`}
                    d={loc.path}
                    fill={isAral ? '#0284C7' : getRegionFillColor(index, loc.id)}
                    stroke={isSelected ? '#1E5BF8' : '#FFFFFF'}
                    strokeWidth={isSelected ? 1.8 : 0.8}
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
          </div>

          {/* Selected Region Quick Info Floating Card */}
          {activeRegionData && (
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] rounded-xl p-3.5 shadow-sm text-xs space-y-2">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2">
                <div className="flex items-center gap-1.5 font-bold text-sm text-[var(--text-primary)]">
                  <span>{activeRegionData.name}</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary-border)]">
                  #{activeRegionRank} oʻrinda
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-1.5 rounded-lg bg-[var(--background)]">
                  <div className="text-[10px] text-[var(--text-tertiary)]">Jami</div>
                  <div className="font-bold text-[var(--text-primary)] tabular-nums text-xs mt-0.5">
                    {activeRegionData.calcTotal.toLocaleString('en-US')}
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-[var(--background)]">
                  <div className="text-[10px] text-[var(--text-tertiary)]">Yangi</div>
                  <div className="font-bold text-[var(--text-primary)] tabular-nums text-xs mt-0.5">
                    +{activeRegionData.calcNew}
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-[var(--background)]">
                  <div className="text-[10px] text-[var(--text-tertiary)]">Faol</div>
                  <div className="font-bold text-[var(--text-primary)] tabular-nums text-xs mt-0.5">
                    {activeRegionData.calcActive}
                  </div>
                </div>
              </div>

              {/* Share of Republic Progress Bar */}
              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)]">
                  <span>Respublika ulushi:</span>
                  <span className="font-semibold text-[var(--text-primary)] tabular-nums">
                    {((activeRegionData.calcTotal / totalStats.sumTotal) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--background)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
                    style={{
                      width: `${((activeRegionData.calcTotal / totalStats.sumTotal) * 100).toFixed(1)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map Attribution and Unassigned Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-xs text-[var(--text-tertiary)] border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[var(--text-secondary)]">
              Hududi koʻrsatilmagan foydalanuvchilar: <span className="tabular-nums font-semibold text-[var(--text-primary)]">{UNASSIGNED_REGION.total.toLocaleString('en-US')} nafar</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Detailed Region Data Table ── */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 space-y-4">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                Hududlar reytingi va koʻrsatkichlari
              </h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)]">
                14 ta hudud
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Koʻrsatkichlar ustiga bosib saralashingiz mumkin
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
            <input
              type="text"
              placeholder="Hudud nomini qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-8 rounded-lg text-xs bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] text-[var(--text-primary)] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                <X size={12} weight="bold" />
              </button>
            )}
          </div>
        </div>

        {/* Table Container with Roomy Spacing */}
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[var(--surface-raised)] border-b border-[var(--border)] text-[var(--text-secondary)]">
              <tr>
                <th className="py-3 px-3.5 font-semibold w-12 text-center">#</th>
                <th className="py-3 px-3.5 font-semibold">Hudud</th>
                <th
                  className="py-3 px-3.5 font-semibold text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors select-none"
                  onClick={() => {
                    if (sortField === 'total') setSortAsc(!sortAsc);
                    else { setSortField('total'); setSortAsc(false); }
                  }}
                >
                  <div className="inline-flex items-center gap-1.5 justify-end">
                    <span>Jami</span>
                    {sortField === 'total' && (sortAsc ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />)}
                  </div>
                </th>
                <th
                  className="py-3 px-3.5 font-semibold text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors select-none"
                  onClick={() => {
                    if (sortField === 'newUsers') setSortAsc(!sortAsc);
                    else { setSortField('newUsers'); setSortAsc(false); }
                  }}
                >
                  <div className="inline-flex items-center gap-1.5 justify-end">
                    <span>Yangi ({activeRange.label})</span>
                    {sortField === 'newUsers' && (sortAsc ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />)}
                  </div>
                </th>
                <th
                  className="py-3 px-3.5 font-semibold text-right cursor-pointer hover:text-[var(--text-primary)] transition-colors select-none"
                  onClick={() => {
                    if (sortField === 'active') setSortAsc(!sortAsc);
                    else { setSortField('active'); setSortAsc(false); }
                  }}
                >
                  <div className="inline-flex items-center gap-1.5 justify-end">
                    <span>Faol</span>
                    {sortField === 'active' && (sortAsc ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />)}
                  </div>
                </th>
                <th className="py-3 px-3.5 font-semibold text-right hidden md:table-cell">Ulush</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {displayList.map((region, idx) => {
                const isSelected = selectedRegionId === region.id;
                const percentOfTotal = ((region.calcTotal / totalStats.sumTotal) * 100).toFixed(1);

                return (
                  <tr
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    onMouseEnter={() => setHoveredRegionId(region.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className={cn(
                      'transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-[var(--primary-soft)] font-semibold'
                        : 'hover:bg-[var(--background)]'
                    )}
                  >
                    <td className="py-3 px-3.5 text-center font-mono text-xs text-[var(--text-tertiary)]">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3.5 text-[var(--text-primary)]">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2 rounded-full shrink-0"
                          style={{
                            backgroundColor: isSelected ? 'var(--primary)' : 'var(--border)'
                          }}
                        />
                        <span className="font-medium text-[var(--text-primary)]">{region.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3.5 text-right text-[var(--text-primary)] tabular-nums font-semibold">
                      {region.calcTotal.toLocaleString('en-US')}
                    </td>
                    <td className="py-3 px-3.5 text-right text-[var(--text-secondary)] tabular-nums font-medium">
                      +{region.calcNew.toLocaleString('en-US')}
                    </td>
                    <td className="py-3 px-3.5 text-right text-[var(--text-secondary)] tabular-nums font-medium">
                      {region.calcActive.toLocaleString('en-US')}
                    </td>
                    <td className="py-3 px-3.5 text-right tabular-nums text-xs text-[var(--text-secondary)] hidden md:table-cell">
                      <div className="flex items-center justify-end gap-2">
                        <span>{percentOfTotal}%</span>
                        <div className="w-12 h-1.5 rounded-full bg-[var(--background)] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[var(--primary)]"
                            style={{ width: `${Math.min(100, Math.round((region.calcTotal / 24000) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Special Unassigned row */}
              <tr className="bg-[var(--surface-raised)]/60 text-[var(--text-secondary)] font-medium">
                <td className="py-3 px-3.5 text-center text-xs text-[var(--text-tertiary)] italic">—</td>
                <td className="py-3 px-3.5 italic text-[var(--text-secondary)]">
                  {UNASSIGNED_REGION.name}
                </td>
                <td className="py-3 px-3.5 text-right tabular-nums font-semibold text-[var(--text-secondary)]">
                  {UNASSIGNED_REGION.total.toLocaleString('en-US')}
                </td>
                <td className="py-3 px-3.5 text-right text-[var(--text-secondary)] tabular-nums font-medium">
                  +{Math.round(UNASSIGNED_REGION.newUsers * activeRange.factorNew)}
                </td>
                <td className="py-3 px-3.5 text-right text-[var(--text-secondary)] tabular-nums font-medium">
                  {Math.round(UNASSIGNED_REGION.active * activeRange.factorActive)}
                </td>
                <td className="py-3 px-3.5 text-right tabular-nums text-xs text-[var(--text-tertiary)] hidden md:table-cell">
                  {((UNASSIGNED_REGION.total / totalStats.sumTotal) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>

            {/* Total Footer Row */}
            <tfoot className="bg-[var(--surface-raised)] font-bold border-t border-[var(--border)] text-[var(--text-primary)]">
              <tr>
                <td className="py-3 px-3.5 text-center text-xs">∑</td>
                <td className="py-3 px-3.5">Respublika boʻyicha jami</td>
                <td className="py-3 px-3.5 text-right tabular-nums font-bold">
                  {totalStats.sumTotal.toLocaleString('en-US')}
                </td>
                <td className="py-3 px-3.5 text-right tabular-nums text-[var(--text-secondary)] font-semibold">
                  +{totalStats.sumNew.toLocaleString('en-US')}
                </td>
                <td className="py-3 px-3.5 text-right tabular-nums text-[var(--text-secondary)] font-semibold">
                  {totalStats.sumActive.toLocaleString('en-US')}
                </td>
                <td className="py-3 px-3.5 text-right tabular-nums text-xs hidden md:table-cell">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </section>
  );
}
