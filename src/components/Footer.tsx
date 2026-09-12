import React from 'react';
import { Shield, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenSIH: () => void;
  onOpenDocs: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSIH, onOpenDocs, onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center font-bold">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight">Mitra Verify</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Unified Online Verification &amp; Digital Certification Platform for Weighing and Measuring Instruments.
            </p>
            <div className="text-[11px] text-amber-300 font-semibold bg-amber-950/60 p-2 rounded-lg border border-amber-800/40 inline-block">
              Smart India Hackathon 2026 • PS ID: 26036 • Team UnityX
            </div>
          </div>

          {/* Col 2: Core Workflows */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Core Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateTab('qr-verify')} className="hover:text-white transition">
                  Public QR Certificate Verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('apply')} className="hover:text-white transition">
                  Apply for Initial / Re-verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('field-officer')} className="hover:text-white transition">
                  LMO Field Inspection Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('dashboard')} className="hover:text-white transition">
                  Stakeholder Lifecycle Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory & Technical Resources */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Statutory &amp; Solution
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSIH} className="text-sky-400 hover:text-sky-300 transition flex items-center gap-1 font-medium">
                  <FileText className="w-3 h-3" />
                  <span>SIH 2026 Technical Presentation</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenDocs} className="text-sky-400 hover:text-sky-300 transition flex items-center gap-1 font-medium">
                  <ExternalLink className="w-3 h-3" />
                  <span>Architecture &amp; Security Docs</span>
                </button>
              </li>
              <li className="text-slate-500">Legal Metrology Act, 2009 (Sec 24)</li>
              <li className="text-slate-500">Legal Metrology (General) Rules, 2011</li>
            </ul>
          </div>

          {/* Col 4: Citizen Trust & Security */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Digital Trust &amp; Standards
            </h4>
            <div className="text-slate-400 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SHA-256 Anti-Tamper Hologram</span>
              </div>
              <p>Certified under National Physical Laboratory (NPL) standards trace.</p>
              <div className="pt-2 text-[10px] text-slate-500">
                Department of Consumer Affairs, Government of India
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Mitra Verify • Smart India Hackathon (SIH 2026) Problem Statement 26036 • Developed by Team UnityX.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenDocs} className="hover:text-slate-300">Security Policy</button>
            <span>•</span>
            <button onClick={onOpenSIH} className="hover:text-slate-300">System Architecture</button>
            <span>•</span>
            <span className="text-slate-400">Open Public Access</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
