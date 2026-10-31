import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Smartphone, 
  Building2, 
  CreditCard, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';
import { formatINR } from '../utils/formatters';

export const UpiPaymentModal = ({ fee, isOpen, onClose, onPaymentSuccess }) => {
  const { schoolConfig, payFee } = useSchoolData();

  const [paymentTab, setPaymentTab] = useState('qr'); // 'qr' | 'vpa' | 'netbanking'
  const [vpaId, setVpaId] = useState('rajesh.sharma@okaxis');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedReceiptId, setGeneratedReceiptId] = useState(null);

  if (!isOpen || !fee) return null;

  const handleExecutePayment = (methodTitle) => {
    setIsProcessing(true);
    setProcessingStep('Initializing 256-bit secure gateway session...');

    setTimeout(() => {
      setProcessingStep('Awaiting authorization from UPI Switch (NPCI)...');
    }, 800);

    setTimeout(() => {
      setProcessingStep('Verifying digital cryptographic clearance...');
    }, 1500);

    setTimeout(() => {
      const receiptId = payFee(fee.id, methodTitle);
      setGeneratedReceiptId(receiptId);
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess(receiptId);
        }
      }, 1200);
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isProcessing ? onClose : undefined}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 bg-slate-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <QrCode className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-white">
                  UPI Institutional Fee Gateway
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {schoolConfig.name} • {schoolConfig.upiId}
                </p>
              </div>
            </div>

            {!isProcessing && (
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Invoice Summary Strip */}
          <div className="px-6 py-3.5 bg-cyan-950/20 border-b border-cyan-500/10 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                {fee.invoiceNumber}
              </div>
              <div className="text-xs text-slate-300 font-medium truncate max-w-[240px]">
                {fee.term}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Total Payable</div>
              <div className="text-lg font-mono font-black text-cyan-300">
                {formatINR(fee.amount)}
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-heading">
                    Payment Successfully Verified!
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Digital official receipt generated with 256-bit cryptographic seal.
                  </p>
                  <p className="text-xs font-mono text-emerald-400 font-semibold mt-2">
                    Receipt ID: {generatedReceiptId}
                  </p>
                </div>
              </motion.div>
            ) : isProcessing ? (
              <div className="py-12 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto" />
                <div>
                  <h4 className="text-base font-bold text-white">
                    Processing Transaction...
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {processingStep}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Do not refresh or close this browser window</span>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Payment Mode Selector Tabs */}
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-white/5 text-xs font-medium">
                  <button
                    onClick={() => setPaymentTab('qr')}
                    className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      paymentTab === 'qr' 
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Dynamic QR</span>
                  </button>
                  <button
                    onClick={() => setPaymentTab('vpa')}
                    className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      paymentTab === 'vpa' 
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>UPI VPA</span>
                  </button>
                  <button
                    onClick={() => setPaymentTab('netbanking')}
                    className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      paymentTab === 'netbanking' 
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>NetBanking</span>
                  </button>
                </div>

                {/* Tab 1: Dynamic QR Code */}
                {paymentTab === 'qr' && (
                  <div className="text-center space-y-4">
                    <div 
                      onClick={() => handleExecutePayment('Dynamic UPI QR (Simulated)')}
                      className="cursor-pointer group relative inline-block p-4 rounded-2xl bg-white border-4 border-cyan-500/40 shadow-xl shadow-cyan-500/10 transition-transform hover:scale-[1.02]"
                    >
                      {/* Realistic Simulated UPI QR Code SVG */}
                      <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none">
                        {/* Top-left marker */}
                        <rect x="5" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                        <rect x="9" y="9" width="18" height="18" rx="2" fill="#ffffff" />
                        <rect x="13" y="13" width="10" height="10" rx="2" fill="#06b6d4" />
                        {/* Top-right marker */}
                        <rect x="69" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                        <rect x="73" y="9" width="18" height="18" rx="2" fill="#ffffff" />
                        <rect x="77" y="13" width="10" height="10" rx="2" fill="#06b6d4" />
                        {/* Bottom-left marker */}
                        <rect x="5" y="69" width="26" height="26" rx="4" fill="#0f172a" />
                        <rect x="9" y="73" width="18" height="18" rx="2" fill="#ffffff" />
                        <rect x="13" y="77" width="10" height="10" rx="2" fill="#06b6d4" />
                        {/* Grid matrix patterns */}
                        <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
                        <rect x="46" y="8" width="8" height="6" fill="#0f172a" />
                        <rect x="36" y="20" width="8" height="6" fill="#0f172a" />
                        <rect x="48" y="20" width="6" height="6" fill="#0f172a" />
                        <rect x="8" y="38" width="8" height="8" fill="#0f172a" />
                        <rect x="22" y="38" width="8" height="8" fill="#0f172a" />
                        <rect x="36" y="36" width="28" height="28" rx="4" fill="#0f172a" />
                        <text x="50" y="53" textAnchor="middle" fill="#06b6d4" fontSize="11" fontWeight="bold" fontFamily="sans-serif">UPI</text>
                        <rect x="70" y="38" width="8" height="8" fill="#0f172a" />
                        <rect x="84" y="38" width="8" height="8" fill="#0f172a" />
                        <rect x="36" y="72" width="6" height="8" fill="#0f172a" />
                        <rect x="48" y="72" width="8" height="8" fill="#0f172a" />
                        <rect x="62" y="72" width="10" height="8" fill="#0f172a" />
                        <rect x="78" y="72" width="8" height="8" fill="#0f172a" />
                        <rect x="36" y="86" width="12" height="6" fill="#0f172a" />
                        <rect x="54" y="86" width="14" height="6" fill="#0f172a" />
                        <rect x="74" y="86" width="16" height="6" fill="#0f172a" />
                      </svg>
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan-300 text-xs font-bold font-mono transition-opacity rounded-2xl">
                        Click to Simulate Scan
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-slate-300 font-medium">
                        Scan with Google Pay, PhonePe, Paytm, BHIM, or CRED
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Instant zero-fee transaction • Auto-receipt confirmation
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExecutePayment('Simulated UPI QR Payment')}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
                    >
                      <span>Simulate QR Scan & Pay {formatINR(fee.amount)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Tab 2: UPI ID (VPA) */}
                {paymentTab === 'vpa' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Enter UPI ID / Virtual Payment Address (VPA)
                      </label>
                      <input
                        type="text"
                        value={vpaId}
                        onChange={(e) => setVpaId(e.target.value)}
                        placeholder="yourname@okaxis, yourname@okhdfcbank"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-cyan-500/50"
                      />
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified VPA Handle: Rajesh Sharma</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1 text-xs text-slate-400">
                      <div className="flex items-center justify-between">
                        <span>Payer Name:</span>
                        <span className="text-white font-medium">Rajesh Sharma</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Convenience Fee:</span>
                        <span className="text-emerald-400 font-mono">₹0.00 (Zero Surcharge)</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExecutePayment(`UPI Collect (${vpaId})`)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
                    >
                      <span>Send Collect Request & Pay {formatINR(fee.amount)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Tab 3: NetBanking */}
                {paymentTab === 'netbanking' && (
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-slate-300">
                      Select Authorized Indian Bank
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'sbi', name: 'State Bank of India' },
                        { id: 'hdfc', name: 'HDFC Bank' },
                        { id: 'icici', name: 'ICICI Bank' },
                        { id: 'axis', name: 'Axis Bank' }
                      ].map(bank => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id)}
                          className={`p-3 rounded-xl text-left border text-xs transition-all ${
                            selectedBank === bank.id 
                              ? 'bg-cyan-500/15 border-cyan-500/50 text-white font-medium' 
                              : 'bg-slate-950/40 border-white/10 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <Building2 className="w-4 h-4 mb-1 text-cyan-400" />
                          <div>{bank.name}</div>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExecutePayment(`NetBanking (${selectedBank.toUpperCase()})`)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
                    >
                      <span>Proceed to Bank Gateway ({formatINR(fee.amount)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Security Footnote */}
                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NPCI & RBI Certified Unified Payments Interface</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};