import React, { useState } from 'react';
import { Smartphone, CheckCircle2, MapPin, Camera, QrCode, AlertCircle, Wifi, WifiOff, FileCheck2, Scale, RefreshCw } from 'lucide-react';
import { InstrumentRecord, CalibrationReading } from '../types';
import confetti from 'canvas-confetti';

interface OfficerFieldViewProps {
  instruments: InstrumentRecord[];
  onCertifyInstrument: (instrumentId: string, updatedRecord: InstrumentRecord) => void;
  onViewCertificate: (certNo: string) => void;
}

export const OfficerFieldView: React.FC<OfficerFieldViewProps> = ({
  instruments,
  onCertifyInstrument,
  onViewCertificate,
}) => {
  const [selectedInstId, setSelectedInstId] = useState<string>(
    instruments.find((i) => i.status === 'PENDING_VERIFICATION')?.id || instruments[0].id
  );
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isCapturingGPS, setIsCapturingGPS] = useState(false);
  const [gpsLocked, setGpsLocked] = useState(true);

  // Field test readings
  const [readings, setReadings] = useState<CalibrationReading[]>([
    { testLoad: '5 kg (Class M1)', indicatedLoad: '5.000 kg', error: '0 g', mpe: '±5 g', passed: true },
    { testLoad: '15 kg', indicatedLoad: '15.002 kg', error: '+2 g', mpe: '±10 g', passed: true },
    { testLoad: '30 kg (Max)', indicatedLoad: '29.997 kg', error: '-3 g', mpe: '±15 g', passed: true },
  ]);

  const [sealNumber, setSealNumber] = useState('LM-SEAL-DL-26-B-9912');
  const [stampingQuarter, setStampingQuarter] = useState('Q2 (B)');
  const [officerNotes, setOfficerNotes] = useState('All verification tolerances within Schedule VI limits. Stamping lead seal affixed securely.');
  const [isCertifying, setIsCertifying] = useState(false);
  const [successCertNo, setSuccessCertNo] = useState<string | null>(null);

  const activeInstrument = instruments.find((i) => i.id === selectedInstId) || instruments[0];

  const handleUpdateReading = (index: number, field: keyof CalibrationReading, value: any) => {
    const updated = [...readings];
    updated[index] = { ...updated[index], [field]: value };
    setReadings(updated);
  };

  const handleLockGPS = () => {
    setIsCapturingGPS(true);
    setTimeout(() => {
      setIsCapturingGPS(false);
      setGpsLocked(true);
    }, 800);
  };

  const handleCompleteVerification = () => {
    setIsCertifying(true);
    const certNo = `DL-LM-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const today = new Date().toISOString().split('T')[0];
    const expiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    setTimeout(() => {
      const updated: InstrumentRecord = {
        ...activeInstrument,
        status: 'VERIFIED',
        lastVerificationDate: today,
        expiryDate: expiry,
        readings,
        certificate: {
          certificateNo: certNo,
          applicationId: `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          instrumentId: activeInstrument.id,
          qrPayload: `https://mitraverify.gov.in/verify/${certNo}?sec=${Math.random().toString(36).substring(2, 8)}`,
          issueDate: today,
          expiryDate: expiry,
          issuedByOfficer: 'Rajesh Sharma',
          officerDesignation: 'Legal Metrology Officer (Class-I)',
          verificationCenter: 'State Legal Metrology Department, Delhi Zone-IV',
          jurisdiction: activeInstrument.district,
          sealNumber: sealNumber,
          stampingYear: '2026',
          stampingQuarter: stampingQuarter,
          mpeCompliance: true,
          tamperEvidentHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
          digitalSignature: `DIGITALLY_SIGNED:RAJESH_SHARMA_LMO_${today.replace(/-/g, '')}`,
        },
      };

      onCertifyInstrument(activeInstrument.id, updated);
      setIsCertifying(false);
      setSuccessCertNo(certNo);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Officer Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center font-bold text-white shadow-xs">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Field Inspection &amp; Mobile Verification Console</h2>
              <span className="text-[11px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded">
                LMO Mobile App Mode
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspector Rajesh Sharma (ID: DL-LMO-048) • Zone-IV Field Operations
            </p>
          </div>
        </div>

        {/* Offline Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition ${
              isOfflineMode
                ? 'bg-amber-950/70 text-amber-300 border-amber-800'
                : 'bg-emerald-950/70 text-emerald-300 border-emerald-800'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOfflineMode ? 'Offline Sync Mode (Active)' : 'Cloud Connected'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Assigned Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Today's Field Queue ({instruments.length})
            </h3>
            <span className="text-xs text-sky-600 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Geo-Sorted
            </span>
          </div>

          <div className="space-y-3">
            {instruments.map((inst) => {
              const isSelected = inst.id === selectedInstId;
              return (
                <div
                  key={inst.id}
                  onClick={() => { setSelectedInstId(inst.id); setSuccessCertNo(null); }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-50/70 border-sky-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{inst.businessName}</div>
                      <div className="text-[11px] text-slate-500">{inst.category}</div>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      inst.status === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inst.status === 'PENDING_VERIFICATION'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {inst.status === 'VERIFIED' ? 'Certified' : inst.status === 'PENDING_VERIFICATION' ? 'Pending' : 'Due/Expired'}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{inst.serialNumber}</span>
                    <span>{inst.district}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Inspection Form */}
        <div className="lg:col-span-8">
          {successCertNo ? (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-200 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Verification Stamped &amp; Issued
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">
                  Digital Certificate Generated
                </h3>
                <p className="text-sm text-slate-600 mt-1 font-mono font-semibold text-sky-600">
                  Certificate No: {successCertNo}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Tamper-evident QR code created. Verification record updated in Central Legal Metrology registry.
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onViewCertificate(successCertNo)}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-xs"
                >
                  View Issued Certificate &amp; QR
                </button>
                <button
                  onClick={() => setSuccessCertNo(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl transition"
                >
                  Proceed to Next Inspection
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              
              {/* Header Details of Active Instrument */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    Active Inspection Inspection
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {activeInstrument.businessName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    {activeInstrument.businessAddress}, {activeInstrument.district}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-800">{activeInstrument.serialNumber}</div>
                  <div className="text-xs text-slate-500">{activeInstrument.category}</div>
                  <div className="text-[11px] font-semibold text-sky-600">{activeInstrument.accuracyClass}</div>
                </div>
              </div>

              {/* Geo-tag & Photo Evidence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      GPS Verification Coordinates
                    </span>
                    <button
                      onClick={handleLockGPS}
                      disabled={isCapturingGPS}
                      className="text-[11px] font-semibold text-sky-600 hover:text-sky-700"
                    >
                      {isCapturingGPS ? 'Acquiring...' : 'Refresh GPS'}
                    </button>
                  </div>
                  <div className="text-xs font-mono text-slate-800 font-semibold">
                    {activeInstrument.latitude.toFixed(4)}° N, {activeInstrument.longitude.toFixed(4)}° E
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-1">
                    ✓ Within 15m radius of registered commercial premise
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-sky-600" />
                      Photographic Evidence
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Captured
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Front panel serial plate &amp; lead wire seal photographed
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    EXIF timestamp encrypted into verification payload
                  </div>
                </div>
              </div>

              {/* Calibration Test Readings Table */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-sky-600" />
                    Standard Test Weight Calibration Readings (MPE Check)
                  </h4>
                  <span className="text-[11px] text-slate-500">Legal Metrology Schedule VI</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 font-semibold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Test Load</th>
                        <th className="py-2.5 px-3">Indicated Load</th>
                        <th className="py-2.5 px-3">Observed Error</th>
                        <th className="py-2.5 px-3">Permissible MPE</th>
                        <th className="py-2.5 px-3">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {readings.map((r, idx) => (
                        <tr key={idx}>
                          <td className="py-2 px-3 font-semibold text-slate-900">{r.testLoad}</td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={r.indicatedLoad}
                              onChange={(e) => handleUpdateReading(idx, 'indicatedLoad', e.target.value)}
                              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded font-mono text-xs w-28"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={r.error}
                              onChange={(e) => handleUpdateReading(idx, 'error', e.target.value)}
                              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded font-mono text-xs w-20"
                            />
                          </td>
                          <td className="py-2 px-3 font-mono text-slate-500">{r.mpe}</td>
                          <td className="py-2 px-3">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              PASS
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Physical Stamping & Lead Seal Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Physical Stamping Seal Number *
                  </label>
                  <input
                    type="text"
                    value={sealNumber}
                    onChange={(e) => setSealNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stamping Year / Quarter Stamp *
                  </label>
                  <select
                    value={stampingQuarter}
                    onChange={(e) => setStampingQuarter(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  >
                    <option value="Q1 (A)">2026 / Q1 (A - Jan-Mar)</option>
                    <option value="Q2 (B)">2026 / Q2 (B - Apr-Jun)</option>
                    <option value="Q3 (C)">2026 / Q3 (C - Jul-Sep)</option>
                    <option value="Q4 (D)">2026 / Q4 (D - Oct-Dec)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Officer Inspection Notes &amp; Observations
                  </label>
                  <input
                    type="text"
                    value={officerNotes}
                    onChange={(e) => setOfficerNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Generates tamper-evident QR code &amp; signs with LMO credentials
                </div>

                <button
                  onClick={handleCompleteVerification}
                  disabled={isCertifying}
                  id="officer-certify-btn"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition cursor-pointer"
                >
                  {isCertifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                  <span>{isCertifying ? 'Generating Digital QR Certificate...' : 'Approve & Issue QR Certificate'}</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
