import React, { useState } from 'react';
import { X, Award, CheckCircle2, ShieldCheck, Cpu, ArrowRight, Layers, FileText, Database, Server, Smartphone } from 'lucide-react';

interface SIHSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SIHSolutionModal: React.FC<SIHSolutionModalProps> = ({ isOpen, onClose }) => {
  const [activeSlide, setActiveSlide] = useState<number>(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
              SIH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight">Smart India Hackathon 2026</span>
                <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                  PS ID: 26036
                </span>
              </div>
              <p className="text-xs text-slate-400">Team UnityX • Digital Legal Metrology Platform</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Navigation Tabs */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs font-semibold overflow-x-auto">
          {[
            { num: 1, title: 'Title & Team' },
            { num: 2, title: 'Proposed Solution' },
            { num: 3, title: 'Technical Stack' },
            { num: 4, title: 'Impact & Trust Loop' },
            { num: 5, title: 'Risk Engine & Feasibility' },
            { num: 6, title: 'Statutory Research' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveSlide(s.num)}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                activeSlide === s.num
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Slide 0{s.num}: {s.title}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Slide 1: Title & Team */}
          {activeSlide === 1 && (
            <div className="space-y-6 text-center py-6">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-600 to-indigo-600 mx-auto flex items-center justify-center text-white text-3xl font-black shadow-lg">
                SIH
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  Problem Statement ID - 26036
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 max-w-2xl mx-auto">
                  Development of an Online Verification System for Weighing and Measuring Instruments
                </h3>
                <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
                  Under the Legal Metrology Act, 2009 and the Legal Metrology (General) Rules, 2011.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left text-xs bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Theme:</span>
                  <strong className="text-slate-800">Miscellaneous</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Category:</span>
                  <strong className="text-slate-800">Software</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Team:</span>
                  <strong className="text-sky-700">Team UnityX</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Platform:</span>
                  <strong className="text-slate-800">MitraVerify</strong>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2: Proposed Solution */}
          {activeSlide === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Proposed Solution</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  MitraVerify — One digital journey for every weighing and measuring instrument.
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Apply online, get the right verifier, record inspection on mobile, and receive a QR-authenticated certificate.
                </p>
              </div>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-sky-50/70 rounded-2xl p-5 border border-sky-200/80">
                  <div className="text-2xl mb-2">📋</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">1. Unified online portal</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>Register users, LMOs and GATCs</li>
                    <li>Submit applications and track status</li>
                    <li>Keep one record for each instrument</li>
                  </ul>
                </div>

                <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200/80">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">2. Smart field verification</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>Auto-allocate officer / GATC by location</li>
                    <li>Capture readings, photo and geo-tag</li>
                    <li>Works offline; syncs when connected</li>
                  </ul>
                </div>

                <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/80">
                  <div className="text-2xl mb-2">📜</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">3. Digital trust &amp; compliance</h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    <li>Issue tamper-evident certificate with QR</li>
                    <li>Public scan verifies status instantly</li>
                    <li>Alerts prevent missed re-verification</li>
                  </ul>
                </div>
              </div>

              {/* 5-Step Process */}
              <div className="bg-slate-900 text-white rounded-2xl p-6">
                <div className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-4">
                  How It Works: Five Clear Steps
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
                  <div className="p-3 bg-slate-800 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white inline-flex items-center justify-center font-bold mb-2">1</span>
                    <div className="font-bold text-white">APPLY</div>
                    <p className="text-[11px] text-slate-400 mt-1">Owner submits instrument specs &amp; pays statutory fee</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white inline-flex items-center justify-center font-bold mb-2">2</span>
                    <div className="font-bold text-white">SCHEDULE</div>
                    <p className="text-[11px] text-slate-400 mt-1">System assigns nearest LMO / GATC &amp; route slot</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white inline-flex items-center justify-center font-bold mb-2">3</span>
                    <div className="font-bold text-white">INSPECT</div>
                    <p className="text-[11px] text-slate-400 mt-1">Field app records MPE readings, photos &amp; GPS</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white inline-flex items-center justify-center font-bold mb-2">4</span>
                    <div className="font-bold text-white">CERTIFY</div>
                    <p className="text-[11px] text-slate-400 mt-1">Officer approves &amp; digitally signs QR certificate</p>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white inline-flex items-center justify-center font-bold mb-2">5</span>
                    <div className="font-bold text-white">VERIFY &amp; RENEW</div>
                    <p className="text-[11px] text-slate-400 mt-1">Public QR scanning + automated expiry alerts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3: Technical Approach */}
          {activeSlide === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Technical Approach</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Secure • Scalable • Field-Ready Architecture
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-3">
                    <Smartphone className="w-4 h-4" />
                    UI: Web + Mobile Experience
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 font-mono">
                    <div>• React 19 + TypeScript</div>
                    <div>• Tailwind CSS Responsive</div>
                    <div>• PWA Offline Field Mode</div>
                    <div>• QR Scanning &amp; Camera API</div>
                    <div>• Geolocation GPS Tracking</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
                    <Server className="w-4 h-4" />
                    API: Backend + Security
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 font-mono">
                    <div>• Node.js + Express REST APIs</div>
                    <div>• JWT / Role-Based Access Control</div>
                    <div>• TLS 1.3 &amp; AES-256 Encryption</div>
                    <div>• Immutable Audit Logging</div>
                    <div>• Digital Signature Integration</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-3">
                    <Database className="w-4 h-4" />
                    DB: Data &amp; Deployment
                  </div>
                  <div className="text-xs text-slate-600 space-y-1 font-mono">
                    <div>• PostgreSQL Central DB</div>
                    <div>• Redis Session Cache</div>
                    <div>• Cloud Object Storage</div>
                    <div>• Docker / Cloud Run Containers</div>
                    <div>• Phased Rollout Infrastructure</div>
                  </div>
                </div>
              </div>

              {/* Field-to-Cloud Trust Layer Banner */}
              <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white p-6 rounded-2xl">
                <h4 className="text-sm font-bold text-sky-300 uppercase tracking-wider mb-2">
                  Field-to-Cloud Trust Layer
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  LMO/GATC mobile app captures calibration readings, images and location—even offline.
                  Sync validates data → immutable record → QR scan authenticates certificate for public citizens.
                </p>
              </div>
            </div>
          )}

          {/* Slide 4: Impact & Trust Loop */}
          {activeSlide === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Impact &amp; Benefits</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  The Trust Loop: Apply → Verify → Certify → Renew
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80">
                  <div className="text-xs font-bold text-sky-800 mb-1">01 Instrument owners &amp; businesses</div>
                  <p className="text-xs text-slate-600">
                    Apply online, track progress, download certificates and receive renewal reminders. Less travel and fewer follow-ups.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-xs font-bold text-amber-800 mb-1">02 LMOs &amp; GATCs</div>
                  <p className="text-xs text-slate-600">
                    Structured work queues, scheduled visits and mobile inspection records. Better workload visibility and less paperwork.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="text-xs font-bold text-emerald-800 mb-1">03 Consumers &amp; Citizens</div>
                  <p className="text-xs text-slate-600">
                    Scan a QR code to confirm certificate status and instrument identity before a purchase or commercial transaction.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80">
                  <div className="text-xs font-bold text-purple-800 mb-1">04 Departments &amp; Admins</div>
                  <p className="text-xs text-slate-600">
                    Live visibility into pendency, expiry exposure, jurisdiction-wise performance and enforcement priorities.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-sky-700">Transparency</div>
                  <div className="text-[11px] text-slate-500">Verifiable digital record</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-emerald-700">Efficiency</div>
                  <div className="text-[11px] text-slate-500">Better scheduling + no paper</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-amber-700">Compliance</div>
                  <div className="text-[11px] text-slate-500">Targeted re-verification</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-sm font-bold text-indigo-700">Trust</div>
                  <div className="text-[11px] text-slate-500">Public QR verification</div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 5: Risk Engine & Feasibility */}
          {activeSlide === 5 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Feasibility &amp; Viability</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Software-Led Risk Engine &amp; Phased Rollout
                </h3>
              </div>

              {/* Risk Engine Visual */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  History + Readings + Non-Compliance
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 font-semibold text-xs sm:text-sm">
                  <span className="bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200">
                    RISK SCORE (Manufacturer/Owner)
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="bg-sky-50 text-sky-800 px-4 py-2 rounded-xl border border-sky-200">
                    PRIORITY (Re-verification)
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200">
                    SMART SCHEDULE (Officer/GATC)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Rules, dashboards and alerts replace a hardware-heavy targeting layer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Phase 1: Pilot</div>
                  <p className="text-slate-500">One state Department / GATC pilot testing core digital certificates.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Phase 2: State-wide</div>
                  <p className="text-slate-500">Full rollout across all divisional districts with LMO field app.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">Phase 3: Pan-India</div>
                  <p className="text-slate-500">Pan-India API expansion with National Legal Metrology portal integration.</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 6: Research & References */}
          {activeSlide === 6 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Research Basis</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Statutory Legality, Policy &amp; Security Standards
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">01 Legal Metrology Act, 2009</div>
                  <div className="text-slate-600">Statutory framework, inspection powers, verification &amp; stamping mandate.</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">02 Legal Metrology (General) Rules, 2011</div>
                  <div className="text-slate-600">Instrument accuracy standards, verification procedure &amp; stamping rules.</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">03 Department of Consumer Affairs</div>
                  <div className="text-slate-600">Consumer protection, citizen trust &amp; official legal metrology guidelines.</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">04 OWASP API Security Top 10</div>
                  <div className="text-slate-600">API security, role access control, auditability and secure-by-design framing.</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">05 NIST Digital Identity Guidelines</div>
                  <div className="text-slate-600">Identity, authentication &amp; role-based verification considerations.</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">06 DENSO WAVE - QR Code Standards</div>
                  <div className="text-slate-600">QR-based public lookup &amp; certificate authenticity verification.</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">Team UnityX • SIH 2026 Problem Statement ID 26036</span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl transition"
          >
            Close Presentation
          </button>
        </div>

      </div>
    </div>
  );
};
