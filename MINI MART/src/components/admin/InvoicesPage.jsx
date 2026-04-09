import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Receipt } from "lucide-react";

export default function InvoicesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-red-500" />
            Quản lý Hóa đơn
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Lịch sử giao dịch bán hàng của ca làm việc
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-bold">Mã HĐ</TableHead>
              <TableHead className="font-bold">Thời gian</TableHead>
              <TableHead className="font-bold text-right">Tổng tiền</TableHead>
              <TableHead className="font-bold text-center">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-slate-800">HD-260401-01</TableCell>
              <TableCell className="text-slate-600">08:15 - Hôm nay</TableCell>
              <TableCell className="text-right font-bold text-red-600">250.000₫</TableCell>
              <TableCell className="text-center">
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold">Thành công</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-800">HD-260401-02</TableCell>
              <TableCell className="text-slate-600">09:30 - Hôm nay</TableCell>
              <TableCell className="text-right font-bold text-red-600">125.000₫</TableCell>
              <TableCell className="text-center">
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold">Thành công</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
