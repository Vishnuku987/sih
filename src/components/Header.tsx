import React, { useState } from 'react';
import { Shield, CheckCircle2, UserCheck, Smartphone, LogIn, LogOut, Menu, X, FileCheck, Layers, FileText } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  userProfileName: string;
  onOpenLogin: () => void;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenSIHModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  userProfileName,
  onOpenLogin,
  onLogout,
  activeTab,
  setActiveTab,
  isMobileFrame,
  setIsMobileFrame,
  onOpenSIHModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Official Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-slate-200">Legal Metrology Act, 2009 &amp; (General) Rules, 2011</span>
          <span className="hidden md:inline text-slate-400">• Ministry of Consumer Affairs, Food &amp; Public Distribution</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-amber-300 font-semibold bg-amber-950/60 px-2 py-0.5 rounded text-[11px] border border-amber-800/60">
            <span className="text-[10px] uppercase tracking-wider">SIH 2026</span> • PS ID: 26036
          </span>
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition ${
              isMobileFrame ? 'bg-sky-600 text-white font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle simulated mobile device frame preview"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden sm:inline">{isMobileFrame ? 'Exit Mobile Frame' : 'Mobile Preview'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Mitra <span className="text-sky-600">Verify</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 rounded">
                  Gov e-Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Digital Legal Metrology Verification System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === 'home' ? 'text-sky-600 bg-sky-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home &amp; Overview
            </button>
            <button
              onClick={() => setActiveTab('qr-verify')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'qr-verify' ? 'text-sky-600 bg-sky-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Public QR Verify
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'apply' ? 'text-sky-600 bg-sky-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileCheck className="w-4 h-4 text-sky-600" />
              Apply Online
            </button>
            <button
              onClick={() => setActiveTab('field-officer')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'field-officer' ? 'text-sky-600 bg-sky-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4 text-indigo-600" />
              Officer Field Mode
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${
                activeTab === 'dashboard' ? 'text-sky-600 bg-sky-50 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-600" />
              Stakeholder Console
            </button>
            <button
              onClick={onOpenSIHModal}
              className="px-3 py-2 rounded-lg flex items-center gap-1 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium transition"
            >
              <FileText className="w-4 h-4 text-rose-500" />
              SIH 2026 PPT Solution
            </button>
          </nav>

          {/* User Profile / Login */}
          <div className="flex items-center gap-3">
            {currentRole !== 'public' ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-semibold text-slate-900 flex items-center gap-1 justify-end">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {userProfileName}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 bg-sky-100 px-1.5 py-0.2 rounded">
                    {currentRole === 'lmo' ? 'Legal Metrology Officer' : currentRole === 'owner' ? 'Instrument Owner' : currentRole === 'gatc' ? 'GATC Lab' : 'State Admin'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                id="portal-login-btn"
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-xs transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Portal Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 space-y-1">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${activeTab === 'home' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'}`}
            >
              Home &amp; Overview
            </button>
            <button
              onClick={() => { setActiveTab('qr-verify'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${activeTab === 'qr-verify' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'}`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Public QR Verification
            </button>
            <button
              onClick={() => { setActiveTab('apply'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${activeTab === 'apply' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'}`}
            >
              <FileCheck className="w-4 h-4 text-sky-600" />
              Apply Online
            </button>
            <button
              onClick={() => { setActiveTab('field-officer'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${activeTab === 'field-officer' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'}`}
            >
              <Smartphone className="w-4 h-4 text-indigo-600" />
              Officer Field Mode
            </button>
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-sky-50 text-sky-700 font-semibold' : 'text-slate-700'}`}
            >
              <Layers className="w-4 h-4 text-amber-600" />
              Stakeholder Console
            </button>
            <button
              onClick={() => { onOpenSIHModal(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-rose-600 font-medium"
            >
              <FileText className="w-4 h-4" />
              SIH 2026 Technical Solution
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
