import React, { useState, useEffect } from 'react';
import { Search, QrCode, ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Printer, Share2, MapPin, Calendar, Award, Camera, RefreshCw } from 'lucide-react';
import { InstrumentRecord } from '../types';
import { generateQRCodeDataUrl } from '../utils/qrHelper';

interface PublicQRVerifierProps {
  instruments: InstrumentRecord[];
  initialCertId?: string;
  onClose?: () => void;
}

export const PublicQRVerifier: React.FC<PublicQRVerifierProps> = ({
  instruments,
  initialCertId = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialCertId || 'DL-LM-2026-09418');
  const [matchedInstrument, setMatchedInstrument] = useState<InstrumentRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isScanningCamera, setIsScanningCamera] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const performSearch = (query: string) => {
    setIsSearching(true);
    setNotFound(false);
    
    setTimeout(() => {
      const q = query.trim().toUpperCase();
      const found = instruments.find(
        (inst) =>
          inst.certificate?.certificateNo.toUpperCase().includes(q) ||
          inst.serialNumber.toUpperCase().includes(q) ||
          inst.id.toUpperCase().includes(q)
      );

      if (found) {
        setMatchedInstrument(found);
        setNotFound(false);
      } else {
        setMatchedInstrument(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 300);
  };

  useEffect(() => {
    if (initialCertId) {
      setSearchQuery(initialCertId);
      performSearch(initialCertId);
    } else {
      performSearch(searchQuery);
    }
  }, [initialCertId]);

  useEffect(() => {
    if (matchedInstrument?.certificate) {
      const payload = `https://mitraverify.gov.in/verify/${matchedInstrument.certificate.certificateNo}?id=${matchedInstrument.id}&seal=${matchedInstrument.certificate.sealNumber}`;
      generateQRCodeDataUrl(payload).then(setQrCodeUrl);
    }
  }, [matchedInstrument]);

  const handleSimulateScan = (certNo: string) => {
    setIsScanningCamera(true);
    setTimeout(() => {
      setIsScanningCamera(false);
      setSearchQuery(certNo);
      performSearch(certNo);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Public Trust &amp; Anti-Tamper Verification</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Verify Stamping &amp; Certificate Authenticity
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Scan the QR sticker affixed to any weighing instrument or enter the certificate number to verify legal metrology compliance in real-time.
        </p>
      </div>

      {/* Search and Scan Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="cert-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && performSearch(searchQuery)}
              placeholder="Enter Certificate No. (e.g. DL-LM-2026-09418) or Serial No. (e.g. WB-60T-DL-8821)"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-sky-500 rounded-2xl text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden transition"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => performSearch(searchQuery)}
              id="cert-verify-submit-btn"
              disabled={isSearching}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] active:scale-98 text-white font-semibold text-sm px-6 py-3.5 rounded-2xl shadow-xs transition"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Verify Now</span>
            </button>

            <button
              onClick={() => handleSimulateScan('DL-LM-2026-03102')}
              id="cert-qr-camera-btn"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3.5 rounded-2xl transition shadow-xs"
              title="Simulate Camera QR Scanner"
            >
              <Camera className="w-4 h-4" />
              <span>Simulate QR Scan</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Pre-selected Chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Quick Demo Samples:</span>
          <button
            onClick={() => { setSearchQuery('DL-LM-2026-09418'); performSearch('DL-LM-2026-09418'); }}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium border border-emerald-200 transition"
          >
            ✓ 60T Weighbridge (Active Stamped)
          </button>
          <button
            onClick={() => { setSearchQuery('DL-LM-2026-03102'); performSearch('DL-LM-2026-03102'); }}
            className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-medium border border-sky-200 transition"
          >
            ✓ Fuel Dispenser Nozzle (Active)
          </button>
          <button
            onClick={() => { setSearchQuery('DL-LM-2025-08194'); performSearch('DL-LM-2025-08194'); }}
            className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium border border-amber-200 transition"
          >
            ⚠ Gold Balance (Re-verification Due)
          </button>
          <button
            onClick={() => { setSearchQuery('DL-LM-2025-04419'); performSearch('DL-LM-2025-04419'); }}
            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium border border-rose-200 transition"
          >
            ✕ Mandi Platform (Expired Stamping)
          </button>
        </div>
      </div>

      {/* Camera Simulator Overlay */}
      {isScanningCamera && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-sm w-full text-center border border-slate-700 shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Simulating Camera Scan</h3>
            <p className="text-xs text-slate-400 mb-6">Aligning QR code sticker with optical recognition frame...</p>
            
            {/* Viewfinder simulation */}
            <div className="relative w-48 h-48 mx-auto border-2 border-dashed border-sky-400 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-800/50">
              <div className="absolute inset-x-0 h-0.5 bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-bounce"></div>
              <QrCode className="w-24 h-24 text-slate-600 opacity-60" />
            </div>

            <div className="mt-6 text-xs text-sky-400 font-mono animate-pulse">
              DECODING LEGAL METROLOGY QR STAMP...
            </div>
          </div>
        </div>
      )}

      {/* Search Results Display */}
      {notFound && (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center max-w-xl mx-auto">
          <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-rose-900">Certificate Not Found</h3>
          <p className="text-sm text-rose-700 mt-1">
            No verification certificate exists with the identifier <span className="font-mono font-bold">"{searchQuery}"</span>.
          </p>
          <p className="text-xs text-rose-600 mt-3">
            Using unverified or unstamped instruments in commercial transactions is a cognizable offence under Section 24 of the Legal Metrology Act, 2009.
          </p>
        </div>
      )}

      {/* Official Legal Metrology Certificate Output */}
      {matchedInstrument && matchedInstrument.certificate && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-none">
          
          {/* Top Verification Status Bar */}
          <div className={`px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b ${
            matchedInstrument.status === 'VERIFIED'
              ? 'bg-emerald-500 text-white'
              : matchedInstrument.status === 'RE_VERIFICATION_DUE'
              ? 'bg-amber-500 text-white'
              : 'bg-rose-600 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {matchedInstrument.status === 'VERIFIED' ? (
                <CheckCircle2 className="w-6 h-6 text-white" />
              ) : matchedInstrument.status === 'RE_VERIFICATION_DUE' ? (
                <AlertTriangle className="w-6 h-6 text-white" />
              ) : (
                <XCircle className="w-6 h-6 text-white" />
              )}
              <div>
                <div className="text-xs uppercase tracking-wider font-bold opacity-90">
                  Legal Metrology Verification Status
                </div>
                <div className="text-lg font-black tracking-tight">
                  {matchedInstrument.status === 'VERIFIED'
                    ? 'VERIFIED & LEGALLY STAMPED'
                    : matchedInstrument.status === 'RE_VERIFICATION_DUE'
                    ? 'RE-VERIFICATION DUE (GRACE PERIOD)'
                    : 'VERIFICATION EXPIRED / UNSTAMPED'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-xs transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => alert(`Certificate link copied: https://mitraverify.gov.in/verify/${matchedInstrument.certificate?.certificateNo}`)}
                className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-xs transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Certificate Body (Government Form VI Style) */}
          <div className="p-6 sm:p-10 bg-gradient-to-b from-amber-50/20 via-white to-sky-50/20">
            
            {/* National Emblem & Title Header */}
            <div className="text-center pb-8 border-b-2 border-slate-900/10 relative">
              <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-serif text-xl font-bold shadow-md">
                LM
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Government of India • Directorate of Legal Metrology
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 mt-1">
                Certificate of Verification
              </h3>
              <p className="text-xs text-slate-600 italic mt-0.5">
                [Issued under Rule 24 of the Legal Metrology (General) Rules, 2011 &amp; Legal Metrology Act, 2009]
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-semibold text-slate-800">
                <span className="bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  Certificate No: <strong className="text-sky-700">{matchedInstrument.certificate.certificateNo}</strong>
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  Seal No: <strong className="text-slate-900">{matchedInstrument.certificate.sealNumber}</strong>
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  Stamping: <strong className="text-emerald-700">{matchedInstrument.certificate.stampingYear} / {matchedInstrument.certificate.stampingQuarter}</strong>
                </span>
              </div>
            </div>

            {/* Content Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 items-start">
              
              {/* Left Details */}
              <div className="md:col-span-8 space-y-6">
                
                {/* 1. Establishment & Instrument Info */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-sky-600" />
                    1. Establishment &amp; Commercial Owner
                  </h4>
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Trading Business Name:</span>
                      <strong className="text-slate-900 font-semibold">{matchedInstrument.businessName}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Owner / Authorized Signatory:</span>
                      <span className="text-slate-900 font-medium">{matchedInstrument.ownerName}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">GSTIN / Tax ID:</span>
                      <span className="font-mono text-slate-700">{matchedInstrument.gstin}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Premise Address &amp; District:</span>
                      <span className="text-slate-700 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        {matchedInstrument.businessAddress}, {matchedInstrument.district}, {matchedInstrument.state}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Technical Specifications of Instrument */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-sky-600" />
                    2. Instrument Specifications &amp; Class
                  </h4>
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Category:</span>
                      <strong className="text-slate-900">{matchedInstrument.category}</strong>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Accuracy Class:</span>
                      <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-xs">
                        {matchedInstrument.accuracyClass}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Serial Number:</span>
                      <span className="font-mono font-bold text-slate-800">{matchedInstrument.serialNumber}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Manufacturer:</span>
                      <span className="text-slate-700 text-xs">{matchedInstrument.manufacturer}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Max / Min Capacity:</span>
                      <span className="text-slate-800 font-medium">{matchedInstrument.capacityMax} / {matchedInstrument.capacityMin}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Verification Interval (e):</span>
                      <span className="font-mono text-slate-700">{matchedInstrument.verificationInterval_e}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-3">
                      <span className="text-xs text-slate-500 block">Central Model Approval No.:</span>
                      <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {matchedInstrument.modelApprovalNo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Calibration Test Readings */}
                {matchedInstrument.readings && matchedInstrument.readings.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-sky-600" />
                      3. Standard Verification Calibration Observations
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3">Standard Test Load</th>
                            <th className="py-2.5 px-3">Indicated Reading</th>
                            <th className="py-2.5 px-3">Observed Error</th>
                            <th className="py-2.5 px-3">Permissible MPE</th>
                            <th className="py-2.5 px-3">Result</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {matchedInstrument.readings.map((r, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="py-2 px-3 font-semibold text-slate-800">{r.testLoad}</td>
                              <td className="py-2 px-3 text-slate-700">{r.indicatedLoad}</td>
                              <td className="py-2 px-3 text-slate-700">{r.error}</td>
                              <td className="py-2 px-3 text-slate-500">{r.mpe}</td>
                              <td className="py-2 px-3">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                  PASS
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: QR Seal & Validity */}
              <div className="md:col-span-4 flex flex-col items-center justify-between h-full space-y-6">
                
                {/* Genuine QR Code Card */}
                <div className="w-full bg-white rounded-2xl p-5 border-2 border-slate-900 shadow-md text-center">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Tamper-Evident QR Stamp
                  </div>
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="Legal Metrology Digital QR Code"
                      className="w-44 h-44 mx-auto rounded-lg shadow-xs p-1 bg-white border border-slate-100"
                    />
                  ) : (
                    <div className="w-44 h-44 mx-auto bg-slate-100 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-slate-400" />
                    </div>
                  )}
                  <div className="mt-3 text-[10px] text-slate-500 font-mono break-all px-2">
                    HASH: {matchedInstrument.certificate.tamperEvidentHash.slice(0, 24)}...
                  </div>
                </div>

                {/* Validity Period Box */}
                <div className="w-full bg-slate-900 text-white rounded-2xl p-5 text-center shadow-lg">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 font-medium mb-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    Validity Period
                  </div>
                  <div className="text-xl font-bold tracking-tight text-amber-300">
                    {matchedInstrument.certificate.issueDate} to {matchedInstrument.certificate.expiryDate}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Rule 27 Annual Re-verification Cycle
                  </div>
                </div>

                {/* Officer Digital Signature Box */}
                <div className="w-full bg-sky-50/80 rounded-2xl p-4 border border-sky-200/80 text-center">
                  <div className="text-[10px] uppercase font-bold text-sky-800 tracking-wider mb-1">
                    Digitally Signed &amp; Stamped By
                  </div>
                  <div className="font-serif italic font-bold text-slate-900 text-base">
                    {matchedInstrument.certificate.issuedByOfficer}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {matchedInstrument.certificate.officerDesignation}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {matchedInstrument.certificate.verificationCenter}
                  </div>
                  <div className="mt-2 text-[9px] font-mono text-slate-400">
                    {matchedInstrument.certificate.digitalSignature}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Disclaimer */}
            <div className="pt-6 border-t border-slate-200 text-center text-[11px] text-slate-500 space-y-1">
              <p>
                This electronic verification certificate is issued under the Legal Metrology Act, 2009 and is admissible as primary evidence under the Information Technology Act, 2000.
              </p>
              <p className="font-semibold text-slate-700">
                Tampering with the digital seal, QR code, or physical stamping lead seal carries penal prosecution under Section 34 of the Legal Metrology Act.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
