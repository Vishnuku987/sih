import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Scale } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onFilterStatus?: (status: string) => void;
  registeredCount?: number;
  pendingCount?: number;
  verifiedCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onFilterStatus,
  registeredCount = 1248,
  pendingCount = 326,
  verifiedCount = 922,
}) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#eaf4fe] via-[#f3f8fd] to-white pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-sky-100/60">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Smart &amp; Digital{' '}
              <span className="text-[#0284c7]">Instrument</span>
              <br />
              <span className="text-[#0284c7]">Verification</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              A unified online platform for registration, verification, re-verification and digital certification of weighing and measuring instruments.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onGetStarted}
                id="hero-get-started-btn"
                className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] active:scale-98 text-white font-semibold text-base px-7 py-3.5 rounded-xl shadow-md shadow-sky-500/25 transition-all duration-200 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-2 py-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>Legal Metrology Act, 2009 Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Floating Card: Verification Overview */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white rounded-3xl p-7 shadow-[0_15px_35px_-5px_rgba(2,132,199,0.08),0_10px_20px_-5px_rgba(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-[0_20px_45px_-5px_rgba(2,132,199,0.12)]">
              
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Verification Overview
                </h2>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                  Live Registry
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Stat 1: Registered Instruments */}
                <div 
                  onClick={() => onFilterStatus?.('ALL')}
                  className="bg-[#f2f7fc] hover:bg-[#eaf2fb] cursor-pointer rounded-2xl p-4 transition-colors border border-sky-100/50 group"
                  id="stat-registered-instruments"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-[26px] font-extrabold text-[#0284c7] leading-tight group-hover:scale-105 origin-left transition-transform">
                        {registeredCount.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-slate-700 mt-0.5">
                        Registered Instruments
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-sky-600 shadow-xs">
                      <Scale className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Stat 2: Pending Verification */}
                <div 
                  onClick={() => onFilterStatus?.('PENDING_VERIFICATION')}
                  className="bg-[#f2f7fc] hover:bg-[#eaf2fb] cursor-pointer rounded-2xl p-4 transition-colors border border-sky-100/50 group"
                  id="stat-pending-verification"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-[26px] font-extrabold text-[#0284c7] leading-tight group-hover:scale-105 origin-left transition-transform">
                        {pendingCount.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-slate-700 mt-0.5">
                        Pending Verification
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-xs">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Stat 3: Verified Instruments */}
                <div 
                  onClick={() => onFilterStatus?.('VERIFIED')}
                  className="bg-[#f2f7fc] hover:bg-[#eaf2fb] cursor-pointer rounded-2xl p-4 transition-colors border border-sky-100/50 group"
                  id="stat-verified-instruments"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-[26px] font-extrabold text-[#0284c7] leading-tight group-hover:scale-105 origin-left transition-transform">
                        {verifiedCount.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium text-slate-700 mt-0.5">
                        Verified Instruments
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Central Legal Metrology Database</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 99.8% Stamped
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
