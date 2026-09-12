import React from 'react';
import { X, ShieldCheck, Server, Lock, Database, Code2, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface TechnicalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalDocsModal: React.FC<TechnicalDocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Technical Documentation &amp; Architecture Specification</h3>
              <p className="text-xs text-slate-400">Software Architecture, Security Framework &amp; Deployment Methodology</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Section 1: System Overview */}
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-600" />
              1. Architectural Overview &amp; Field-to-Cloud Trust Layer
            </h4>
            <p className="text-xs leading-relaxed text-slate-600">
              MitraVerify is architected as an offline-first, cloud-synchronized platform designed to support high-frequency field inspections across geographically dispersed jurisdictions. Field inspectors (LMOs and GATC laboratory technicians) operate on a responsive progressive web/mobile client capable of caching test weight specifications, capturing optical proof, and recording calibration telemetry offline. Upon network discovery, records sync with cryptographic integrity checks.
            </p>
          </div>

          {/* Section 2: Security Framework */}
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              2. Security Framework &amp; Cryptographic Anti-Counterfeit System
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 mb-1">Tamper-Evident QR Integrity:</strong>
                Each certificate QR payload embeds a SHA-256 digital signature of the certificate payload (serial, date, officer ID, MPE error margins), rendering duplicate or forged QR stickers instantly detectable upon public scanning.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 mb-1">Transport &amp; Data Security:</strong>
                All communication is mandated over TLS 1.3 with HSTS. At-rest encryption uses AES-256 for biometric signatures, merchant KYC documents, and photographic evidence.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 mb-1">Role-Based Access Control (RBAC):</strong>
                Enforces least-privilege segregation among Instrument Owners, State LMOs, GATC Testing Labs, and State Directorate Administrators.
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900 mb-1">Immutable Audit Logging:</strong>
                All certificate issuance, rejection, and calibration adjustments are stored with tamper-resistant audit trails tracking GPS coordinates, device timestamp, and inspector signature.
              </div>
            </div>
          </div>

          {/* Section 3: Legal Metrology Compliance */}
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              3. Legal Metrology Statutory Compliance
            </h4>
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-2 text-amber-950">
              <p>
                <strong>Legal Metrology Act, 2009 (Section 24):</strong> Mandates that every person having any weight or measure in his possession, custody or control in circumstances indicating that such weight or measure is being, or is likely to be, used in any transaction or protection, shall present it for verification to an officer.
              </p>
              <p>
                <strong>Legal Metrology (General) Rules, 2011:</strong> The platform digitally generates Form VI / Schedule XI compliant Certificates of Verification, tracking standard classes (Class I, II, III, IV), verification scale intervals <em>'e'</em>, maximum permissible errors (MPE), and lead wire seal indexing.
              </p>
            </div>
          </div>

          {/* Section 4: Phased Deployment */}
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              4. Deployment Methodology &amp; Scaling Strategy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900">Phase 1: Pilot</strong>
                <p className="text-slate-500 mt-1">Single state Legal Metrology Department &amp; designated GATC pilot. Verifies 10,000+ retail scales and weighbridges.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900">Phase 2: State Rollout</strong>
                <p className="text-slate-500 mt-1">Expansion across all district divisions, mandatory integration with commercial trade licensing and GSTIN databases.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="block text-slate-900">Phase 3: National Gateway</strong>
                <p className="text-slate-500 mt-1">Federated pan-India API gateway facilitating inter-state commercial transport weighbridge validation.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2 rounded-xl transition"
          >
            Close Documentation
          </button>
        </div>

      </div>
    </div>
  );
};
