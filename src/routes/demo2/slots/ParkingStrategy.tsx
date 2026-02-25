// src/routes/demo2/slots/ParkingStrategy.tsx
import type { ParkingStrategyPayload } from "../types";

interface Props {
  data: ParkingStrategyPayload;
  onChange: (d: ParkingStrategyPayload) => void;
}

export const ParkingStrategy = ({ data, onChange }: Props) => {
  const updateField = (changes: Partial<ParkingStrategyPayload>) => {
    onChange({ ...data, ...changes });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 核心計費模組 - 呼應 image_3e1006.png */}
      <section>
        <header className="flex items-center gap-2 mb-4">
          <div className="size-2 bg-blue-500 rounded-full" />
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">計費模組配置</h3>
        </header>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-[10px] font-bold text-slate-400 mb-2 block">計費模式</label>
            <div className="flex p-1 bg-slate-100 rounded-xl">
              {(['FIXED', 'HOURLY', 'PROGRESSIVE'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => updateField({ mode: m })}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    data.mode === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {m === 'FIXED' ? '固定次費' : m === 'HOURLY' ? '計時收費' : '累進費率'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 mb-1 block">基礎費率 ($/hr)</label>
            <input 
              type="number" 
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.baseRate}
              onChange={(e) => updateField({ baseRate: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 mb-1 block">免費時間 (min)</label>
            <input 
              type="number" 
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.freeMinutes}
              onChange={(e) => updateField({ freeMinutes: Number(e.target.value) })}
            />
          </div>
        </div>
      </section>

      {/* 設備監控 - 呼應 image_3e1006.png */}
      <section className="p-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg">⚠️</span>
            <h3 className="text-sm font-bold text-slate-200">設備異常監控閾值</h3>
          </div>
        </header>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] text-slate-400 mb-2 font-mono uppercase">
              <span>離線告警 (分鐘)</span>
              <span className="text-amber-400 font-bold">{data.thresholds.offlineMinutes} MIN</span>
            </div>
            <input 
              type="range" min="1" max="60"
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none accent-amber-500 cursor-pointer"
              value={data.thresholds.offlineMinutes}
              onChange={(e) => updateField({ 
                thresholds: { ...data.thresholds, offlineMinutes: Number(e.target.value) } 
              })}
            />
          </div>
        </div>
      </section>

      {/* 特殊車主優惠 */}
      <section className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => updateField({ specialRates: { ...data.specialRates, isElectricVehicle: !data.specialRates.isElectricVehicle }})}
          className={`p-3 rounded-xl border text-left transition-all ${data.specialRates.isElectricVehicle ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100'}`}
        >
          <div className="text-xl mb-1">⚡</div>
          <div className="text-[10px] font-black text-slate-400 uppercase">電動車</div>
          <div className={`text-xs font-bold ${data.specialRates.isElectricVehicle ? 'text-emerald-600' : 'text-slate-400'}`}>
            {data.specialRates.isElectricVehicle ? '啟用半價' : '未啟用'}
          </div>
        </button>

        <button 
          onClick={() => updateField({ specialRates: { ...data.specialRates, isSharedBike: !data.specialRates.isSharedBike }})}
          className={`p-3 rounded-xl border text-left transition-all ${data.specialRates.isSharedBike ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100'}`}
        >
          <div className="text-xl mb-1">🛵</div>
          <div className="text-[10px] font-black text-slate-400 uppercase">共享機車</div>
          <div className={`text-xs font-bold ${data.specialRates.isSharedBike ? 'text-indigo-600' : 'text-slate-400'}`}>
            {data.specialRates.isSharedBike ? '免收費' : '未啟用'}
          </div>
        </button>
      </section>
    </div>
  );
};
