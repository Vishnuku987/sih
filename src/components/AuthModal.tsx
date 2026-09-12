import React, { useState } from 'react';
import { X, LogIn, UserPlus, Shield, Building2, CheckCircle2, Award, Briefcase, UserCheck } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, profileName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('owner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [gstin, setGstin] = useState('');
  const [jurisdiction, setJurisdiction] = useState('Delhi Zone IV');

  if (!isOpen) return null;

  const handleDemoLogin = (role: UserRole, name: string) => {
    onLoginSuccess(role, name);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const name = selectedRole === 'lmo' ? 'Insp. Rajesh Sharma' : selectedRole === 'admin' ? 'State Controller S. Rao' : selectedRole === 'gatc' ? 'Precision Metrology Lab' : 'Apex Logistics';
      onLoginSuccess(selectedRole, name);
    } else {
      onLoginSuccess(selectedRole, fullName || businessName || 'Registered User');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Mitra Verify Portal</h3>
              <p className="text-xs text-slate-400">Legal Metrology National Verification Gateway</p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Sign In to Portal
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                authMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              New Stakeholder Registration
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick 1-Click Demo Profiles */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1-Click Quick Demo Sign-In
              </span>
              <span className="text-[11px] text-sky-600 font-semibold">Select Persona</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => handleDemoLogin('owner', 'Apex Logistics & Freight')}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 transition group"
              >
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Instrument Owner</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Apex Logistics (Weighbridge)</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('lmo', 'Inspector Rajesh Sharma')}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition group"
              >
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Legal Metrology Officer</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Insp. R. Sharma (Zone-IV)</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('gatc', 'Precision Metrology GATC Lab')}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition group"
              >
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                  <span>GATC Testing Lab</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Govt Approved Test Centre</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin', 'State Controller of LM')}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition group"
              >
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>State Department Admin</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Directorate Headquarters</div>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink mx-3 text-xs text-slate-400 uppercase font-semibold">Or Enter Credentials</span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
            
            {/* Stakeholder Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Stakeholder Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { role: 'owner', label: 'Owner / Merchant' },
                  { role: 'lmo', label: 'State LMO' },
                  { role: 'gatc', label: 'GATC Lab' },
                  { role: 'admin', label: 'Dept. Admin' },
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setSelectedRole(item.role as UserRole)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition ${
                      selectedRole === item.role
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {authMode === 'register' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Business / Organization *
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      placeholder="e.g. Kumar Fuel Station"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      GSTIN / Trade License / Govt ID *
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="07AAAAA0000A1Z5"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Division / Jurisdiction *
                    </label>
                    <select
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
                    >
                      <option value="Delhi Zone IV">Delhi Zone IV (North &amp; North West)</option>
                      <option value="Delhi Central">Delhi Central &amp; Old Delhi</option>
                      <option value="Delhi South">Delhi South &amp; Okhla</option>
                      <option value="Pan-India Headquarters">Pan-India Central Registry</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email or Mobile Number *
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@delhi.gov.in or owner@company.com"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password / Secure Passcode *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              id="auth-submit-btn"
              className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm py-3 rounded-xl shadow-xs transition mt-2 cursor-pointer"
            >
              {authMode === 'login' ? 'Sign In & Access Dashboard' : 'Complete Registration & KYC'}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
