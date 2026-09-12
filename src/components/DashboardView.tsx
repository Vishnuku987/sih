import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckCircle2, Clock, Scale, Download, Plus, Eye, MapPin, QrCode, TrendingUp, ShieldAlert, FileText, ArrowUpRight } from 'lucide-react';
import { InstrumentRecord, VerificationApplication, UserRole } from '../types';

interface DashboardViewProps {
  currentRole: UserRole;
  userProfileName: string;
  instruments: InstrumentRecord[];
  applications: VerificationApplication[];
  onSelectInstrumentForCert: (certNo: string) => void;
  onOpenApply: () => void;
  onSwitchRole: (role: UserRole, name: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  userProfileName,
  instruments,
  applications,
  onSelectInstrumentForCert,
  onOpenApply,
  onSwitchRole,
}) => {
  const [filterTab, setFilterTab] = useState<'ALL' | 'VERIFIED' | 'PENDING' | 'EXPIRING'>('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  // Filter logic
  const filteredInstruments = instruments.filter((inst) => {
    const matchesSearch =
      inst.businessName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inst.serialNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inst.category.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === 'ALL') return true;
    if (filterTab === 'VERIFIED') return inst.status === 'VERIFIED';
    if (filterTab === 'PENDING') return inst.status === 'PENDING_VERIFICATION' || inst.status === 'SCHEDULED';
    if (filterTab === 'EXPIRING') return inst.status === 'RE_VERIFICATION_DUE' || inst.status === 'EXPIRED';
    return true;
  });

  const verifiedCount = instruments.filter((i) => i.status === 'VERIFIED').length;
  const pendingCount = instruments.filter((i) => i.status === 'PENDING_VERIFICATION' || i.status === 'SCHEDULED').length;
  const dueCount = instruments.filter((i) => i.status === 'RE_VERIFICATION_DUE' || i.status === 'EXPIRED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Console Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Legal Metrology Stakeholder Console
            </h2>
            <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
              {currentRole.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Logged in as: <strong className="text-slate-800">{userProfileName}</strong> • Central Legal Metrology Database (CLMD)
          </p>
        </div>

        {/* Quick Role Switcher for seamless testing */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <span className="text-slate-500 font-semibold px-2">Console Mode:</span>
          <button
            onClick={() => onSwitchRole('owner', 'Apex Logistics & Freight')}
            className={`px-3 py-1 rounded-xl font-bold transition ${
              currentRole === 'owner' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Business Owner
          </button>
          <button
            onClick={() => onSwitchRole('lmo', 'Inspector Rajesh Sharma')}
            className={`px-3 py-1 rounded-xl font-bold transition ${
              currentRole === 'lmo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State LMO
          </button>
          <button
            onClick={() => onSwitchRole('admin', 'State Controller of LM')}
            className={`px-3 py-1 rounded-xl font-bold transition ${
              currentRole === 'admin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admin / Regulator
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
            <span>Total Enrolled Instruments</span>
            <Scale className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{instruments.length}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">100% Unique Serial Tagged</div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
            <span>Active Verified &amp; Stamped</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{verifiedCount}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Tamper-evident QR stamped</div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
            <span>Pending Inspection Queue</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-600">{pendingCount}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Allocated to field officers</div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
            <span>Re-verification Due / Expired</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-black text-rose-600">{dueCount}</div>
          <div className="text-xs text-rose-600 font-medium mt-1">Automated notice dispatched</div>
        </div>
      </div>

      {/* Proactive Expiry Alerts Banner if any due */}
      {dueCount > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Automated Stamping Expiry &amp; Re-verification Reminders Active
              </h3>
              <p className="text-xs text-amber-800">
                {dueCount} instrument(s) require periodic re-verification under Rule 27 of Legal Metrology General Rules 2011.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenApply}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply for Re-verification</span>
          </button>
        </div>
      )}

      {/* Admin Specific: Software-led Risk Engine Panel */}
      {currentRole === 'admin' && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Software-Led Risk Engine &amp; Targeting Layer (SIH Solution)
              </h3>
            </div>
            <span className="text-xs font-mono bg-slate-800 text-sky-400 px-2.5 py-1 rounded">
              HISTORY + READINGS + NON-COMPLIANCE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-slate-400 font-semibold mb-1">High-Risk Enforcement Priority:</div>
              <div className="text-sm font-bold text-rose-400">Platform Scales (APMC Mandis)</div>
              <p className="text-[11px] text-slate-400 mt-1">Risk Score: 89/100 (Expired stamping &gt; 90 days)</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-slate-400 font-semibold mb-1">Moderate Risk Triage:</div>
              <div className="text-sm font-bold text-amber-400">Class I Precision Balances</div>
              <p className="text-[11px] text-slate-400 mt-1">Risk Score: 54/100 (Re-verification due within 30 days)</p>
            </div>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="text-slate-400 font-semibold mb-1">Algorithmic Route Optimization:</div>
              <div className="text-sm font-bold text-emerald-400">Cluster Allocation Active</div>
              <p className="text-[11px] text-slate-400 mt-1">Batching nearby merchant inspections to minimize LMO travel time</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Table: Instruments Records & Stamping Registry */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Digital Instrument Lifecycle Registry
            </h3>
            <p className="text-xs text-slate-500">
              Real-time synchronization across LMO field units and State Headquarters
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilterTab('ALL')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterTab === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                All ({instruments.length})
              </button>
              <button
                onClick={() => setFilterTab('VERIFIED')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterTab === 'VERIFIED' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Verified ({verifiedCount})
              </button>
              <button
                onClick={() => setFilterTab('PENDING')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterTab === 'PENDING' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setFilterTab('EXPIRING')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterTab === 'EXPIRING' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Due/Expired ({dueCount})
              </button>
            </div>

            <button
              onClick={onOpenApply}
              className="inline-flex items-center gap-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Apply Online</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Instrument / Serial</th>
                <th className="py-3 px-4">Establishment &amp; Location</th>
                <th className="py-3 px-4">Category &amp; Class</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4">Certificate &amp; Validity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInstruments.map((inst) => (
                <tr key={inst.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Serial & Manufacturer */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900">{inst.serialNumber}</div>
                    <div className="text-xs text-slate-500">{inst.manufacturer}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Model: {inst.modelApprovalNo}</div>
                  </td>

                  {/* Business & Location */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{inst.businessName}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                      {inst.district}
                    </div>
                  </td>

                  {/* Category & Accuracy Class */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{inst.category}</div>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                      {inst.accuracyClass}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">Cap: {inst.capacityMax}</div>
                  </td>

                  {/* Verification Status */}
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      inst.status === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inst.status === 'PENDING_VERIFICATION'
                        ? 'bg-amber-100 text-amber-800'
                        : inst.status === 'RE_VERIFICATION_DUE'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {inst.status === 'VERIFIED' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Stamped &amp; Active</span>
                        </>
                      ) : inst.status === 'PENDING_VERIFICATION' ? (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending Stamping</span>
                        </>
                      ) : inst.status === 'RE_VERIFICATION_DUE' ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-orange-600" />
                          <span>Renewal Due</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>Expired Stamping</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Certificate & Validity */}
                  <td className="py-3.5 px-4">
                    {inst.certificate ? (
                      <div>
                        <div className="font-mono text-xs font-bold text-sky-700">
                          {inst.certificate.certificateNo}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Valid till: <strong className="text-slate-800">{inst.certificate.expiryDate}</strong>
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          Quarter: {inst.certificate.stampingQuarter}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Not issued yet</span>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4 text-right">
                    {inst.certificate ? (
                      <button
                        onClick={() => onSelectInstrumentForCert(inst.certificate!.certificateNo)}
                        className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View QR Cert</span>
                      </button>
                    ) : (
                      <button
                        onClick={onOpenApply}
                        className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-xs font-semibold"
                      >
                        <span>Schedule</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Active Online Applications Tracking Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Recent Application Submission Queue
            </h3>
            <p className="text-xs text-slate-500">
              Online submissions for new verification and periodic re-verification
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {applications.length} Applications Logged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <span className="font-mono font-bold text-sky-700">{app.id}</span>
                <span className="text-[10px] uppercase font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                  {app.status}
                </span>
              </div>
              <div className="font-bold text-slate-900">{app.businessName}</div>
              <div className="text-slate-600">{app.instrumentCategory} ({app.capacity})</div>
              <div className="text-slate-500 pt-1 border-t border-slate-200 flex justify-between">
                <span>Fee: ₹{app.statutoryFee}</span>
                <span>Date: {app.applicationDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
