import React, { useState } from 'react';
import { FileCheck, MapPin, CheckCircle2, ShieldAlert, ArrowRight, ArrowLeft, Upload, IndianRupee, Sparkles } from 'lucide-react';
import { InstrumentCategory, InstrumentClass, VerificationApplication } from '../types';
import confetti from 'canvas-confetti';

interface ApplicationWizardProps {
  onSubmitApplication: (app: VerificationApplication) => void;
  onViewApplication: (id: string) => void;
}

export const ApplicationWizard: React.FC<ApplicationWizardProps> = ({
  onSubmitApplication,
  onViewApplication,
}) => {
  const [step, setStep] = useState(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [applicantName, setApplicantName] = useState('Vikas Gupta');
  const [businessName, setBusinessName] = useState('Gupta Kirana & Daily Mart');
  const [phone, setPhone] = useState('+91 98110 44219');
  const [email, setEmail] = useState('vikas@guptakirana.in');
  const [category, setCategory] = useState<InstrumentCategory>('Electronic Counter Scale');
  const [accuracyClass, setAccuracyClass] = useState<InstrumentClass>('Class III (Medium)');
  const [serialNumber, setSerialNumber] = useState('ECS-2026-9041');
  const [manufacturer, setManufacturer] = useState('Essae-Teraoka Pvt Ltd');
  const [capacity, setCapacity] = useState('30 kg (e = 5 g)');
  const [modelApprovalNo, setModelApprovalNo] = useState('IND/08/2021/304');
  const [address, setAddress] = useState('Shop 14, Main Market, Lajpat Nagar II');
  const [district, setDistrict] = useState('South Delhi');
  const [verificationType, setVerificationType] = useState<'INITIAL' | 'PERIODIC_REVERIFICATION' | 'POST_REPAIR'>('PERIODIC_REVERIFICATION');
  const [fileName, setFileName] = useState('model_approval_spec.pdf');
  const [photoUploaded, setPhotoUploaded] = useState(true);
  const [gpsCoordinates, setGpsCoordinates] = useState('28.5684° N, 77.2433° E (Captured)');

  // Auto-calculated fee based on statutory schedule
  const getFee = () => {
    switch (category) {
      case 'Electronic Weighbridge':
        return 2500;
      case 'Precision Gold Balance':
        return 1200;
      case 'Fuel Dispenser (Petrol/Diesel)':
        return 1000;
      case 'LPG Filling Scale':
        return 800;
      case 'Platform Scale':
        return 600;
      case 'Electronic Counter Scale':
      default:
        return 400;
    }
  };

  const handleDetectGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsCoordinates(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
        },
        () => {
          setGpsCoordinates('28.6139° N, 77.2090° E (New Delhi Central)');
        }
      );
    } else {
      setGpsCoordinates('28.6139° N, 77.2090° E');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: VerificationApplication = {
      id: newId,
      applicationDate: new Date().toISOString().split('T')[0],
      applicantName,
      businessName,
      phone,
      email,
      instrumentCategory: category,
      accuracyClass,
      serialNumber,
      manufacturer,
      capacity,
      address,
      district,
      verificationType,
      statutoryFee: getFee(),
      status: 'SUBMITTED',
      assignedLMO: 'Allocated to Nearest LMO (Zone IV Division)',
      inspectionNotes: `Online e-Portal submission. Model approval verified: ${modelApprovalNo}. GPS verification point tagged: ${gpsCoordinates}`,
    };

    onSubmitApplication(newApp);
    setSubmittedId(newId);

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  if (submittedId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Application Successfully Filed
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-3">
              Application ID: <span className="text-sky-600 font-mono">{submittedId}</span>
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Your application for verification has been transmitted to the State Legal Metrology Division.
            </p>
          </div>

          {/* Key Application Summary */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left text-xs sm:text-sm space-y-2.5 font-medium">
            <div className="flex justify-between">
              <span className="text-slate-500">Instrument Category:</span>
              <span className="text-slate-900 font-semibold">{category} ({accuracyClass})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Serial Number:</span>
              <span className="font-mono text-slate-800 font-bold">{serialNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Verification Type:</span>
              <span className="text-sky-700 font-semibold">{verificationType.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Statutory Verification Fee:</span>
              <span className="text-slate-900 font-bold">₹{getFee()} (E-Challan Paid)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Field Allocation:</span>
              <span className="text-emerald-700 font-semibold">Allocated to Nearest LMO (Zone IV)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onViewApplication(submittedId)}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-xs"
            >
              Track Application Status
            </button>
            <button
              onClick={() => { setSubmittedId(null); setStep(1); }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-5 py-3 rounded-xl transition"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full border border-sky-100 mb-2">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Legal Metrology Act, 2009 • Section 24 e-Filing</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Application for Verification &amp; Stamping
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          Apply online for initial verification, annual re-verification, or post-repair stamping of commercial weighing instruments.
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
          {[
            { num: 1, label: 'Instrument' },
            { num: 2, label: 'Premise' },
            { num: 3, label: 'Fee & Type' },
            { num: 4, label: 'Review' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              className={`p-2.5 rounded-xl border transition-all ${
                step === s.num
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : step > s.num
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-pointer'
                  : 'bg-white text-slate-400 border-slate-200'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-80">Step 0{s.num}</div>
              <div className="font-bold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit}>
          
          {/* Step 1: Instrument Classification */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Step 1: Instrument Specifications</h3>
                <p className="text-xs text-slate-500">Provide legal specifications as approved by Directorate of Legal Metrology.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Instrument Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as InstrumentCategory)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Electronic Counter Scale">Electronic Counter Scale (≤ 50kg)</option>
                    <option value="Electronic Weighbridge">Electronic Weighbridge (Commercial Road Weighbridge)</option>
                    <option value="Precision Gold Balance">Precision Gold / Diamond Balance (Class I/II)</option>
                    <option value="Fuel Dispenser (Petrol/Diesel)">Fuel Dispenser (Petrol / Diesel / CNG)</option>
                    <option value="Platform Scale">Platform Scale (Heavy Goods)</option>
                    <option value="LPG Filling Scale">LPG Cylinder Filling Scale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Accuracy Class *
                  </label>
                  <select
                    value={accuracyClass}
                    onChange={(e) => setAccuracyClass(e.target.value as InstrumentClass)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="Class I (Special)">Class I (Special Precision - Gold/Diamond/Lab)</option>
                    <option value="Class II (High)">Class II (High Accuracy)</option>
                    <option value="Class III (Medium)">Class III (Medium - Retail, Fuel, Weighbridge)</option>
                    <option value="Class IV (Ordinary)">Class IV (Ordinary - Heavy Bulk Industrial)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Instrument Serial Number *
                  </label>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="e.g. WB-60T-DL-8821"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Manufacturer Make *
                  </label>
                  <input
                    type="text"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Maximum Capacity &amp; Interval (e) *
                  </label>
                  <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Model Approval Number (IND/XX/...) *
                  </label>
                  <input
                    type="text"
                    value={modelApprovalNo}
                    onChange={(e) => setModelApprovalNo(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition"
                >
                  <span>Next: Premise Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Premise & Establishment */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Step 2: Establishment &amp; Location</h3>
                <p className="text-xs text-slate-500">Verification must be executed at the registered commercial location.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Applicant / Authorized Person *
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Business / Trade Name *
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mobile Number (For SMS OTP &amp; Alerts) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Premise Address *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    District Jurisdiction *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:border-sky-500"
                  >
                    <option value="North Delhi">North Delhi (Zone IV)</option>
                    <option value="Central Delhi">Central Delhi (Old Delhi &amp; Karol Bagh)</option>
                    <option value="South Delhi">South Delhi (Zone II)</option>
                    <option value="North West Delhi">North West Delhi</option>
                    <option value="South East Delhi">South East Delhi (Okhla)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    GPS Geotagging for Field Officer Navigation
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={gpsCoordinates}
                      className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleDetectGPS}
                      className="inline-flex items-center gap-1 bg-slate-800 text-white text-xs px-3 py-2.5 rounded-xl hover:bg-slate-700 shrink-0"
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Auto-Tag</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition"
                >
                  <span>Next: Verification Fee</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Verification Type & Statutory Fee */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Step 3: Verification Type &amp; Statutory Fees</h3>
                <p className="text-xs text-slate-500">Government fees calculated as per Legal Metrology (General) Rules Schedule.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: 'PERIODIC_REVERIFICATION',
                    title: 'Periodic Re-verification',
                    desc: 'Annual / biennial mandatory stamping renewal under Rule 27.',
                  },
                  {
                    id: 'INITIAL',
                    title: 'Initial Verification',
                    desc: 'First-time stamping of newly manufactured or imported instrument.',
                  },
                  {
                    id: 'POST_REPAIR',
                    title: 'Post-Repair Stamping',
                    desc: 'Verification after maintenance or loadcell repair by licensed repairer.',
                  },
                ].map((vt) => (
                  <div
                    key={vt.id}
                    onClick={() => setVerificationType(vt.id as any)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                      verificationType === vt.id
                        ? 'border-sky-600 bg-sky-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900 text-sm">{vt.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{vt.desc}</div>
                  </div>
                ))}
              </div>

              {/* Fee Breakdown Card */}
              <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 rounded-2xl p-6 border border-sky-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                      <IndianRupee className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                        Statutory Stamping Fee (Government Treasury)
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900">
                        ₹{getFee()}
                        <span className="text-xs font-normal text-slate-500 ml-1.5">
                          (Includes Inspection &amp; Digital QR Certificate)
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                    Auto-Computed Schedule
                  </span>
                </div>
              </div>

              {/* File Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Attach Model Approval Certificate / Front Plate Photo
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-slate-700">
                    {fileName}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Drag and drop or click to replace (PDF, JPG, PNG up to 10MB)
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition"
                >
                  <span>Review &amp; Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Final Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">Step 4: Review &amp; Declaration</h3>
                <p className="text-xs text-slate-500">Please review all verification details prior to filing with the State Department.</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">Applicant &amp; Business:</span>
                  <strong className="text-slate-900 text-sm">{businessName}</strong> ({applicantName})
                </div>
                <div>
                  <span className="text-slate-500 block">Category &amp; Class:</span>
                  <span className="text-slate-900 font-semibold">{category} - {accuracyClass}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Serial No. &amp; Manufacturer:</span>
                  <span className="font-mono text-slate-800 font-bold">{serialNumber}</span> ({manufacturer})
                </div>
                <div>
                  <span className="text-slate-500 block">Model Approval No:</span>
                  <span className="font-mono text-slate-700">{modelApprovalNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Capacity &amp; Interval:</span>
                  <span className="text-slate-800">{capacity}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Premise Location:</span>
                  <span className="text-slate-800">{address}, {district}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Verification Type:</span>
                  <span className="text-sky-700 font-semibold">{verificationType.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Total Fee Payable:</span>
                  <strong className="text-emerald-700 text-sm">₹{getFee()}</strong>
                </div>
              </div>

              {/* Legal Undertaking */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Legal Metrology Undertaking:</strong>
                  I hereby declare that the instrument particulars given above are correct and the weighing instrument conforms to the standards specified in the Legal Metrology (General) Rules, 2011.
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  id="submit-application-btn"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm px-8 py-3 rounded-xl transition shadow-md shadow-emerald-600/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pay ₹{getFee()} &amp; Submit Application</span>
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
