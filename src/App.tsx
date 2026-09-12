import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WorkflowCards } from './components/WorkflowCards';
import { PublicQRVerifier } from './components/PublicQRVerifier';
import { ApplicationWizard } from './components/ApplicationWizard';
import { OfficerFieldView } from './components/OfficerFieldView';
import { DashboardView } from './components/DashboardView';
import { AuthModal } from './components/AuthModal';
import { SIHSolutionModal } from './components/SIHSolutionModal';
import { TechnicalDocsModal } from './components/TechnicalDocsModal';
import { Footer } from './components/Footer';
import { INITIAL_INSTRUMENTS, INITIAL_APPLICATIONS } from './data/mockData';
import { InstrumentRecord, VerificationApplication, UserRole } from './types';
import { Smartphone, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Scale, QrCode } from 'lucide-react';

export default function App() {
  // Application Data State
  const [instruments, setInstruments] = useState<InstrumentRecord[]>(() => {
    const saved = localStorage.getItem('mitra_verify_instruments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved instruments', e);
      }
    }
    return INITIAL_INSTRUMENTS;
  });

  const [applications, setApplications] = useState<VerificationApplication[]>(() => {
    const saved = localStorage.getItem('mitra_verify_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved applications', e);
      }
    }
    return INITIAL_APPLICATIONS;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('mitra_verify_instruments', JSON.stringify(instruments));
  }, [instruments]);

  useEffect(() => {
    localStorage.setItem('mitra_verify_applications', JSON.stringify(applications));
  }, [applications]);

  // Navigation & Modal State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCertNo, setSelectedCertNo] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [userProfileName, setUserProfileName] = useState<string>('Citizen / Public');
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSIHModalOpen, setIsSIHModalOpen] = useState(false);
  const [isTechDocsModalOpen, setIsTechDocsModalOpen] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Handlers
  const handleAddNewApplication = (newApp: VerificationApplication) => {
    setApplications((prev) => [newApp, ...prev]);

    // Also register the instrument in the registry as pending
    const newInst: InstrumentRecord = {
      id: `INST-2026-${Math.floor(100 + Math.random() * 900)}`,
      serialNumber: newApp.serialNumber,
      modelApprovalNo: 'IND/08/2021/304',
      category: newApp.instrumentCategory,
      accuracyClass: newApp.accuracyClass,
      manufacturer: newApp.manufacturer,
      capacityMax: newApp.capacity,
      capacityMin: '100 g',
      verificationInterval_e: '5 g',
      ownerName: newApp.applicantName,
      businessName: newApp.businessName,
      gstin: '07AAPPG1120M1ZQ',
      businessAddress: newApp.address,
      district: newApp.district,
      state: 'Delhi',
      latitude: 28.5684,
      longitude: 77.2433,
      status: 'PENDING_VERIFICATION',
      riskScore: 50,
      riskTier: 'MEDIUM',
    };

    setInstruments((prev) => [newInst, ...prev]);
  };

  const handleCertifyInstrument = (instrumentId: string, updatedRecord: InstrumentRecord) => {
    setInstruments((prev) =>
      prev.map((inst) => (inst.id === instrumentId ? updatedRecord : inst))
    );
  };

  const handleWorkflowAction = (action: 'registration' | 'verification' | 'scheduling' | 'certificate' | 'qr' | 'alerts') => {
    switch (action) {
      case 'registration':
      case 'verification':
        setActiveTab('apply');
        break;
      case 'scheduling':
        setActiveTab('field-officer');
        break;
      case 'certificate':
      case 'qr':
        setSelectedCertNo('DL-LM-2026-09418');
        setActiveTab('qr-verify');
        break;
      case 'alerts':
        setActiveTab('dashboard');
        break;
    }
  };

  const handleViewCertificate = (certNo: string) => {
    setSelectedCertNo(certNo);
    setActiveTab('qr-verify');
  };

  const handleLoginSuccess = (role: UserRole, name: string) => {
    setCurrentRole(role);
    setUserProfileName(name);
    if (role === 'lmo') {
      setActiveTab('field-officer');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentRole('public');
    setUserProfileName('Citizen / Public');
    setActiveTab('home');
  };

  // Content Renderer
  const renderMainContent = () => {
    switch (activeTab) {
      case 'qr-verify':
        return (
          <PublicQRVerifier
            instruments={instruments}
            initialCertId={selectedCertNo}
            onClose={() => setActiveTab('home')}
          />
        );

      case 'apply':
        return (
          <ApplicationWizard
            onSubmitApplication={handleAddNewApplication}
            onViewApplication={(appId) => {
              setActiveTab('dashboard');
            }}
          />
        );

      case 'field-officer':
        return (
          <OfficerFieldView
            instruments={instruments}
            onCertifyInstrument={handleCertifyInstrument}
            onViewCertificate={handleViewCertificate}
          />
        );

      case 'dashboard':
        return (
          <DashboardView
            currentRole={currentRole}
            userProfileName={userProfileName}
            instruments={instruments}
            applications={applications}
            onSelectInstrumentForCert={handleViewCertificate}
            onOpenApply={() => setActiveTab('apply')}
            onSwitchRole={handleLoginSuccess}
          />
        );

      case 'home':
      default:
        return (
          <div className="space-y-0">
            {/* Exact Landing Page Hero (Screenshot 2) */}
            <HeroSection
              onGetStarted={() => setActiveTab('apply')}
              onFilterStatus={(status) => {
                setActiveTab('dashboard');
              }}
              registeredCount={1248 + instruments.length - INITIAL_INSTRUMENTS.length}
              pendingCount={instruments.filter((i) => i.status === 'PENDING_VERIFICATION' || i.status === 'SCHEDULED').length + 326}
              verifiedCount={instruments.filter((i) => i.status === 'VERIFIED').length + 922}
            />

            {/* Exact One Platform. Complete Workflow. 6-Card Section (Screenshot 1) */}
            <WorkflowCards onSelectAction={handleWorkflowAction} />

            {/* SIH 2026 Interactive Problem Statement & Trust Loop Featurette */}
            <section className="py-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="max-w-3xl space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Smart India Hackathon 2026 • Problem Statement ID 26036</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                      Field-to-Cloud Trust Layer for Legal Metrology
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Transforming the statutory inspection mandate of the Legal Metrology Act, 2009 into an automated, tamper-evident digital verification lifecycle.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <button
                        onClick={() => setIsSIHModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl transition shadow-md"
                      >
                        <span>View SIH 2026 Solution PPT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsTechDocsModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-xl border border-white/20 transition"
                      >
                        <span>Architecture &amp; Security Specs</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('field-officer')}
                        className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-xs"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Try Officer Mobile Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Mobile Frame Simulation Container if toggled */}
      {isMobileFrame ? (
        <div className="min-h-screen bg-slate-950 py-8 px-4 flex flex-col items-center justify-center">
          <div className="mb-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800/60">
              Simulated Mobile Device Frame (Field Officer &amp; Citizen View)
            </span>
            <div className="mt-2 text-xs text-slate-400">
              <button
                onClick={() => setIsMobileFrame(false)}
                className="underline hover:text-white"
              >
                Exit Mobile Preview Mode
              </button>
            </div>
          </div>

          {/* Smartphone Hardware Frame */}
          <div className="w-full max-w-sm h-[844px] bg-white rounded-[44px] border-[12px] border-slate-800 shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-slate-700">
            {/* Phone Notch / Speaker */}
            <div className="h-6 bg-slate-900 w-full flex items-center justify-center shrink-0">
              <div className="w-20 h-3.5 bg-black rounded-b-xl"></div>
            </div>

            {/* Phone Screen Inner */}
            <div className="flex-1 overflow-y-auto bg-white flex flex-col">
              <Header
                currentRole={currentRole}
                userProfileName={userProfileName}
                onOpenLogin={() => setIsAuthModalOpen(true)}
                onLogout={handleLogout}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobileFrame={isMobileFrame}
                setIsMobileFrame={setIsMobileFrame}
                onOpenSIHModal={() => setIsSIHModalOpen(true)}
              />

              <main className="flex-1">
                {renderMainContent()}
              </main>

              <Footer
                onOpenSIH={() => setIsSIHModalOpen(true)}
                onOpenDocs={() => setIsTechDocsModalOpen(true)}
                onNavigateTab={setActiveTab}
              />
            </div>

            {/* Bottom Home Indicator */}
            <div className="h-4 bg-slate-900 w-full flex items-center justify-center shrink-0">
              <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Responsive Desktop / Tablet View */
        <>
          <Header
            currentRole={currentRole}
            userProfileName={userProfileName}
            onOpenLogin={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMobileFrame={isMobileFrame}
            setIsMobileFrame={setIsMobileFrame}
            onOpenSIHModal={() => setIsSIHModalOpen(true)}
          />

          <main className="flex-1">
            {renderMainContent()}
          </main>

          <Footer
            onOpenSIH={() => setIsSIHModalOpen(true)}
            onOpenDocs={() => setIsTechDocsModalOpen(true)}
            onNavigateTab={setActiveTab}
          />
        </>
      )}

      {/* Stakeholder Login & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* SIH 2026 PPT Presentation Modal */}
      <SIHSolutionModal
        isOpen={isSIHModalOpen}
        onClose={() => setIsSIHModalOpen(false)}
      />

      {/* Technical Architecture & Security Documentation Modal */}
      <TechnicalDocsModal
        isOpen={isTechDocsModalOpen}
        onClose={() => setIsTechDocsModalOpen(false)}
      />

    </div>
  );
}
