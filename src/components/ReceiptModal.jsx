import React from 'react';
import { 
  X, 
  Printer, 
  Receipt, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  Calendar,
  CreditCard
} from 'lucide-react';
import { useSchoolData } from '../context/SchoolDataContext';
import { formatINR } from '../utils/formatters';

export const ReceiptModal = ({ fee, onClose }) => {
  const { schoolConfig } = useSchoolData();

  if (!fee) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel-glow rounded-2xl p-6 sm:p-8 bg-slate-900 border border-cyan-500/30 text-slate-100 my-8 shadow-2xl">
        
        {/* Action Header (No Print) */}
        <div className="no-print flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Receipt className="w-5 h-5" />
            <span>Digital Paperless Fee Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt */}
        <div className="printable-document p-6 sm:p-8 rounded-xl bg-slate-950/80 border border-white/10 shadow-inner">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-cyan-500/30 pb-6 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white tracking-tight uppercase">
                  {schoolConfig.name}
                </h3>
                <p className="text-xs text-cyan-400">
                  {schoolConfig.board} • Affiliation: {schoolConfig.affiliationNo}
                </p>
                <p className="text-[10px] text-slate-400">
                  {schoolConfig.address}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Payment Cleared</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                Receipt No: {fee.receiptId || 'REC-AETH-9011'}
              </p>
            </div>
          </div>

          {/* Receipt Info Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/90 border border-white/5 mb-6 text-xs">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Student Name</span>
              <strong className="text-sm text-cyan-300">{fee.studentName}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Academic Class</span>
              <strong className="text-slate-200">{fee.classId}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Invoice Reference</span>
              <strong className="text-slate-200 font-mono">{fee.invoiceNumber}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Payment Date</span>
              <strong className="text-slate-200 font-mono">{fee.paidDate || '2026-10-22'}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Settlement Channel</span>
              <strong className="text-emerald-400">{fee.paymentMethod || 'Instant UPI / NetBanking'}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Verification Key</span>
              <strong className="text-slate-400 font-mono text-[10px]">AUTH-TXN-8849-NPCI</strong>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-300 font-semibold uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-4">Fee Head / Description</th>
                  <th className="py-2.5 px-4 text-center">Tax / Surcharge</th>
                  <th className="py-2.5 px-4 text-right">Amount (INR ₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                <tr>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-200">{fee.term}</p>
                    <p className="text-[10px] text-slate-400">Includes digital LMS licensing, STEM laboratory access & tuition</p>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400 font-mono">₹0.00 (GST Exempt)</td>
                  <td className="py-3 px-4 text-right font-bold text-cyan-300 font-mono">{formatINR(fee.amount)}</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-900/90 border-t border-white/10">
                <tr>
                  <td colSpan="2" className="py-3 px-4 font-bold text-slate-200 uppercase tracking-wider text-right">
                    Total Amount Settled:
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-base text-emerald-400 font-mono">
                    {formatINR(fee.amount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer note */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-[10px] text-slate-400">
                This is an authenticated electronic paperless tax receipt. GST Exempt for educational services under Sec 12AA.
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-cyan-400 text-xs font-semibold">{schoolConfig.name} Treasury</span>
              <p className="text-[10px] text-slate-500 font-mono">Status: Cleared via NPCI</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};