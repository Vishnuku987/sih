import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface WorkflowCardsProps {
  onSelectAction: (action: 'registration' | 'verification' | 'scheduling' | 'certificate' | 'qr' | 'alerts') => void;
}

export const WorkflowCards: React.FC<WorkflowCardsProps> = ({ onSelectAction }) => {
  const cards = [
    {
      id: 'online-registration',
      key: 'registration' as const,
      iconEmoji: '📝',
      title: 'Online Registration',
      description: 'Register weighing and measuring instruments online without lengthy manual processes.',
      badge: 'Step 01',
      bgGlow: 'group-hover:bg-amber-50/40',
    },
    {
      id: 'online-verification',
      key: 'verification' as const,
      iconEmoji: '🔍',
      title: 'Online Verification',
      description: 'Apply for new verification and re-verification through a digital workflow.',
      badge: 'Step 02',
      bgGlow: 'group-hover:bg-sky-50/40',
    },
    {
      id: 'smart-scheduling',
      key: 'scheduling' as const,
      iconEmoji: '📅',
      title: 'Smart Scheduling',
      description: 'Officers can manage applications and schedule verification inspections efficiently.',
      badge: 'Step 03',
      bgGlow: 'group-hover:bg-blue-50/40',
    },
    {
      id: 'digital-certificate',
      key: 'certificate' as const,
      iconEmoji: '📜',
      title: 'Digital Certificate',
      description: 'Generate and access digital verification certificates from anywhere.',
      badge: 'Step 04',
      bgGlow: 'group-hover:bg-emerald-50/40',
    },
    {
      id: 'qr-verification',
      key: 'qr' as const,
      iconEmoji: '🔲',
      title: 'QR Verification',
      description: 'Verify certificate authenticity instantly using a QR-based verification system.',
      badge: 'Step 05',
      bgGlow: 'group-hover:bg-purple-50/40',
    },
    {
      id: 'expiry-alerts',
      key: 'alerts' as const,
      iconEmoji: '🔔',
      title: 'Expiry Alerts',
      description: 'Receive reminders before instrument verification certificates expire.',
      badge: 'Step 06',
      bgGlow: 'group-hover:bg-rose-50/40',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f8fbfe] border-b border-slate-200/60" id="workflow-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            One Platform. Complete Workflow.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Digitizing the complete lifecycle of weighing and measuring instrument verification.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              id={card.id}
              onClick={() => onSelectAction(card.key)}
              className={`group bg-white rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(2,132,199,0.09)] border border-slate-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Subtle top indicator */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl sm:text-4xl select-none group-hover:scale-110 transition-transform origin-left">
                  {card.iconEmoji}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-sky-600 transition-colors flex items-center gap-1">
                  <span>{card.badge}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2.5 group-hover:text-sky-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-50 flex items-center text-xs font-semibold text-sky-600 group-hover:text-sky-700">
                <span>Access Feature</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
