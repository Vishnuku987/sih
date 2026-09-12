export type UserRole = 'public' | 'owner' | 'lmo' | 'gatc' | 'admin';

export type InstrumentClass = 'Class I (Special)' | 'Class II (High)' | 'Class III (Medium)' | 'Class IV (Ordinary)';

export type InstrumentCategory =
  | 'Electronic Weighbridge'
  | 'Fuel Dispenser (Petrol/Diesel)'
  | 'Electronic Counter Scale'
  | 'Precision Gold Balance'
  | 'Platform Scale'
  | 'LPG Filling Scale'
  | 'Automatic Gravimetric Filling'
  | 'Non-automatic Weighing Instrument';

export type VerificationStatus =
  | 'VERIFIED'
  | 'PENDING_VERIFICATION'
  | 'SCHEDULED'
  | 'RE_VERIFICATION_DUE'
  | 'EXPIRED'
  | 'REJECTED';

export interface CalibrationReading {
  testLoad: string;
  indicatedLoad: string;
  error: string;
  mpe: string; // Maximum Permissible Error
  passed: boolean;
}

export interface VerificationCertificate {
  certificateNo: string;
  applicationId: string;
  instrumentId: string;
  qrPayload: string;
  issueDate: string;
  expiryDate: string;
  issuedByOfficer: string;
  officerDesignation: string;
  verificationCenter: string; // LMO office or GATC name
  jurisdiction: string;
  sealNumber: string;
  stampingYear: string;
  stampingQuarter: string;
  mpeCompliance: boolean;
  tamperEvidentHash: string;
  digitalSignature: string;
}

export interface InstrumentRecord {
  id: string;
  serialNumber: string;
  modelApprovalNo: string;
  category: InstrumentCategory;
  accuracyClass: InstrumentClass;
  manufacturer: string;
  capacityMax: string;
  capacityMin: string;
  verificationInterval_e: string;
  ownerName: string;
  businessName: string;
  gstin: string;
  businessAddress: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  status: VerificationStatus;
  lastVerificationDate?: string;
  expiryDate?: string;
  certificate?: VerificationCertificate;
  assignedOfficer?: string;
  scheduledDate?: string;
  riskScore: number; // 0-100 calculated by risk engine
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH';
  readings?: CalibrationReading[];
  photoUrl?: string;
}

export interface VerificationApplication {
  id: string;
  applicationDate: string;
  applicantName: string;
  businessName: string;
  phone: string;
  email: string;
  instrumentCategory: InstrumentCategory;
  accuracyClass: InstrumentClass;
  serialNumber: string;
  manufacturer: string;
  capacity: string;
  address: string;
  district: string;
  verificationType: 'INITIAL' | 'PERIODIC_REVERIFICATION' | 'POST_REPAIR';
  statutoryFee: number;
  status: 'SUBMITTED' | 'SCHEDULED' | 'INSPECTED' | 'APPROVED' | 'REJECTED';
  assignedLMO?: string;
  scheduledDate?: string;
  inspectionNotes?: string;
}
