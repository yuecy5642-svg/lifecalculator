/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  Timer,
  Sparkles,
  Plus,
  Minus,
  Coins
} from 'lucide-react';

// --- Custom Graphics Components ---

const TotoroGraphic = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <path d="M65 50 L55 10 Q65 5 80 25 L85 55" fill="#5F6368" stroke="#374151" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M135 50 L145 10 Q135 5 120 25 L115 55" fill="#5F6368" stroke="#374151" strokeWidth="3" strokeLinejoin="round"/>

    {/* Body */}
    <path d="M100 30 C50 30 30 80 30 140 C30 180 50 195 100 195 C150 195 170 180 170 140 C170 80 150 30 100 30 Z" fill="#5F6368" stroke="#374151" strokeWidth="3"/>

    {/* Arms */}
    <path d="M30 120 Q20 140 35 160" stroke="#374151" strokeWidth="3" fill="#5F6368" strokeLinecap="round"/>
    <path d="M170 120 Q180 140 165 160" stroke="#374151" strokeWidth="3" fill="#5F6368" strokeLinecap="round"/>

    {/* Belly */}
    <ellipse cx="100" cy="145" rx="55" ry="45" fill="#FEF9C3" stroke="#374151" strokeWidth="2"/>

    {/* Belly Marks (Chevrons) */}
    {/* Top Row */}
    <path d="M70 120 Q80 110 90 120" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M95 115 Q105 105 115 115" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M120 120 Q130 110 140 120" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Bottom Row */}
    <path d="M60 140 Q70 130 80 140" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M85 140 Q95 130 105 140" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M110 140 Q120 130 130 140" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M135 140 Q145 130 155 140" stroke="#5F6368" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Face */}
    <circle cx="70" cy="80" r="8" fill="white" stroke="#374151" strokeWidth="2"/>
    <circle cx="70" cy="80" r="3" fill="black"/>
    
    <circle cx="130" cy="80" r="8" fill="white" stroke="#374151" strokeWidth="2"/>
    <circle cx="130" cy="80" r="3" fill="black"/>
    
    <path d="M95 88 L105 88 L100 92 Z" fill="#374151"/> {/* Nose */}
    <path d="M98 100 H102" stroke="#374151" strokeWidth="2" strokeLinecap="round"/> {/* Small mouth line */}

    {/* Whiskers */}
    <path d="M55 85 L20 80" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
    <path d="M55 92 L20 92" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
    <path d="M55 99 L25 104" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
    
    <path d="M145 85 L180 80" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
    <path d="M145 92 L180 92" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
    <path d="M145 99 L175 104" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

type ThemeType = 'totoro';

const themes = {
  totoro: {
    id: 'totoro',
    name: '森林龙猫',
    emoji: '🍃',
    bg: 'bg-[#E8F5E9]', // Fresh green
    card: 'bg-white/90 border-emerald-200 shadow-xl shadow-emerald-200/40',
    textPrimary: 'text-emerald-900',
    textSecondary: 'text-emerald-600/70',
    accent: 'text-emerald-600',
    accentBg: 'bg-emerald-100',
    inputRing: 'focus-within:ring-emerald-300 focus-within:border-emerald-500',
    resultBg: 'bg-[#1F2937]', // Dark grey like Totoro's fur
    resultText: 'text-emerald-50',
    highlight: 'text-emerald-300',
    Graphic: TotoroGraphic
  }
};

export default function App() {
  const [currentTheme] = useState<ThemeType>('totoro');
  const theme = themes[currentTheme];

  // State for inputs
  const [salary, setSalary] = useState<number | ''>('');
  const [dailyHours, setDailyHours] = useState<number | ''>(8);
  const [monthlyDays, setMonthlyDays] = useState<number | ''>(22);
  const [expense, setExpense] = useState<number | ''>('');
  
  // Side Hustle State
  const [showSideHustle, setShowSideHustle] = useState(false);
  const [sideIncome, setSideIncome] = useState<number | ''>('');
  const [sideMonthlyHours, setSideMonthlyHours] = useState<number | ''>('');

  // Calculations
  const hourlyWage = useMemo(() => {
    const mainSalary = Number(salary) || 0;
    const mainHours = (Number(dailyHours) || 0) * (Number(monthlyDays) || 0);
    
    const extraIncome = showSideHustle ? (Number(sideIncome) || 0) : 0;
    const extraHours = showSideHustle ? (Number(sideMonthlyHours) || 0) : 0;

    const totalIncome = mainSalary + extraIncome;
    const totalHours = mainHours + extraHours;

    if (totalHours === 0) return 0;
    return totalIncome / totalHours;
  }, [salary, dailyHours, monthlyDays, sideIncome, sideMonthlyHours, showSideHustle]);

  const timeCost = useMemo(() => {
    if (!expense || hourlyWage === 0) return 0;
    return Number(expense) / hourlyWage;
  }, [expense, hourlyWage]);

  // Format time cost
  const formattedTimeCost = useMemo(() => {
    if (timeCost === 0) return null;
    
    const hours = Math.floor(timeCost);
    const minutes = Math.round((timeCost - hours) * 60);
    
    const workDayHours = Number(dailyHours) || 8;
    
    if (hours >= workDayHours) {
      const days = Math.floor(hours / workDayHours);
      const remainingHours = hours % workDayHours;
      return { days, hours: remainingHours, minutes };
    }
    
    return { days: 0, hours, minutes };
  }, [timeCost, dailyHours]);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme.bg} p-4 sm:p-8 font-sans selection:bg-black/10 overflow-hidden relative`}>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          key={currentTheme + "-bg"}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -right-20 w-96 h-96"
        >
          <theme.Graphic className="w-full h-full" />
        </motion.div>
        <motion.div 
          key={currentTheme + "-bg2"}
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 0.03, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-40 -left-20 w-64 h-64"
        >
          <theme.Graphic className="w-full h-full" />
        </motion.div>
      </div>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        
        {/* Header with Graphic */}
        <motion.div 
          key={currentTheme}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="relative inline-block">
            <div className={`absolute inset-0 rounded-full blur-xl opacity-40 ${theme.accentBg}`}></div>
            <theme.Graphic className="w-32 h-32 relative z-10 drop-shadow-lg mx-auto" />
          </div>
          
          <div>
            <h1 className={`text-3xl font-bold tracking-tight ${theme.textPrimary}`}>
              生命能量计算器
            </h1>
            <p className={`text-sm mt-2 font-medium ${theme.textSecondary}`}>
              种下一颗橡果，需要等待多久的雨水？
            </p>
          </div>
        </motion.div>

        {/* Salary Card */}
        <motion.div 
          layout
          className={`rounded-3xl p-6 border ${theme.card}`}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className={`p-2 rounded-xl ${theme.accentBg} ${theme.accent}`}>
              <Briefcase size={20} />
            </div>
            <h2 className={`text-lg font-bold ${theme.textPrimary}`}>我的身价</h2>
          </div>

          <div className="space-y-4">
            <InputGroup 
              theme={theme}
              label="每月税后工资" 
              icon={<span className="text-lg font-bold">¥</span>}
              value={salary}
              onChange={setSalary}
              placeholder="0"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <InputGroup 
                theme={theme}
                label="日工作时长" 
                icon={<Clock size={16} />}
                value={dailyHours}
                onChange={setDailyHours}
                placeholder="8"
                suffix="小时"
              />
              <InputGroup 
                theme={theme}
                label="月工作天数" 
                icon={<Calendar size={16} />}
                value={monthlyDays}
                onChange={setMonthlyDays}
                placeholder="22"
                suffix="天"
              />
            </div>

            {/* Side Hustle Toggle */}
            <div className="pt-2">
              <button 
                onClick={() => setShowSideHustle(!showSideHustle)}
                className={`flex items-center gap-2 text-xs font-bold ${theme.accent} hover:opacity-80 transition-opacity`}
              >
                <div className={`p-1 rounded-full ${theme.accentBg}`}>
                  {showSideHustle ? <Minus size={12} /> : <Plus size={12} />}
                </div>
                {showSideHustle ? "隐藏副业信息" : "添加副业收入 (可选)"}
              </button>

              <AnimatePresence>
                {showSideHustle && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4">
                      <InputGroup 
                        theme={theme}
                        label="副业月收入" 
                        icon={<Coins size={16} />}
                        value={sideIncome}
                        onChange={setSideIncome}
                        placeholder="0"
                      />
                      <InputGroup 
                        theme={theme}
                        label="副业月耗时" 
                        icon={<Clock size={16} />}
                        value={sideMonthlyHours}
                        onChange={setSideMonthlyHours}
                        placeholder="0"
                        suffix="小时"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-black/5 flex justify-between items-center">
              <span className={`text-sm font-medium ${theme.textSecondary}`}>综合时薪</span>
              <span className={`text-xl font-bold ${theme.textPrimary}`}>
                ¥{hourlyWage.toFixed(1)}
                <span className={`text-xs font-normal ml-1 ${theme.textSecondary}`}>/小时</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Expense Card */}
        <motion.div 
          layout
          className={`rounded-3xl p-6 border relative overflow-hidden ${theme.card}`}
        >
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className={`p-2 rounded-xl ${theme.accentBg} ${theme.accent}`}>
              <ShoppingBag size={20} />
            </div>
            <h2 className={`text-lg font-bold ${theme.textPrimary}`}>想买什么？</h2>
          </div>

          <div className="space-y-6 relative z-10">
            <InputGroup 
              theme={theme}
              label="商品价格" 
              icon={<span className="text-lg font-bold">¥</span>}
              value={expense}
              onChange={setExpense}
              placeholder="输入价格..."
              autoFocus
            />

            <AnimatePresence mode="wait">
              {formattedTimeCost ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className={`rounded-2xl p-5 relative overflow-hidden ${theme.resultBg} ${theme.resultText}`}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-10 rotate-12">
                    <Timer size={80} />
                  </div>
                  
                  <p className="text-xs font-medium mb-1 uppercase tracking-wider opacity-70">
                    生命能量消耗
                  </p>
                  
                  <div className="flex items-baseline gap-2 relative z-10">
                    {formattedTimeCost.days > 0 && (
                      <>
                        <span className={`text-4xl font-bold ${theme.highlight}`}>
                          {formattedTimeCost.days}
                        </span>
                        <span className="text-sm opacity-70 mr-3 font-medium">天</span>
                      </>
                    )}
                    
                    {(formattedTimeCost.hours > 0 || formattedTimeCost.days === 0) && (
                      <>
                        <span className={`text-4xl font-bold ${theme.highlight}`}>
                          {formattedTimeCost.hours}
                        </span>
                        <span className="text-sm opacity-70 mr-3 font-medium">小时</span>
                      </>
                    )}
                    
                    <span className={`text-3xl font-bold ${theme.highlight}`}>
                      {formattedTimeCost.minutes}
                    </span>
                    <span className="text-sm opacity-70 font-medium">分钟</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 text-xs opacity-80 flex items-center gap-2">
                    <theme.Graphic className="w-6 h-6" />
                    <span className="font-medium">
                        这是森林给你的回响...
                    </span>
                  </div>
                </motion.div>
              ) : (
                 <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center py-8 text-sm rounded-2xl border-2 border-dashed border-black/5 ${theme.textSecondary} flex flex-col items-center gap-3`}
                 >
                    <theme.Graphic className="w-12 h-12 opacity-50 grayscale" />
                    <span>
                      输入价格，龙猫帮你算算 🌰
                    </span>
                 </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <div className={`text-center text-xs ${theme.textSecondary} pb-4 font-medium opacity-60`}>
          Made with <Heart size={10} className="inline fill-current mx-0.5" /> for your life energy
        </div>
      </div>
    </div>
  );
}

interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  value: number | '';
  onChange: (val: number | '') => void;
  placeholder?: string;
  suffix?: string;
  theme: any;
  autoFocus?: boolean;
}

function InputGroup({ label, icon, value, onChange, placeholder, suffix, theme, autoFocus }: InputGroupProps) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs font-bold ml-1 block ${theme.textSecondary}`}>{label}</label>
      <div className={`
        group flex items-center bg-slate-50/50 border border-black/5 rounded-2xl px-3 py-3 transition-all duration-200
        ${theme.inputRing} ${theme.textPrimary}
      `}>
        <div className={`mr-2 opacity-50 group-focus-within:opacity-100 transition-opacity ${theme.accent}`}>
          {icon}
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none font-bold placeholder:text-black/20 placeholder:font-normal"
          autoFocus={autoFocus}
        />
        {suffix && (
          <span className={`text-xs font-medium ml-1 opacity-50`}>{suffix}</span>
        )}
      </div>
    </div>
  );
}



