import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, ClipboardList, Eye, Edit, Trash2 } from "lucide-react";
import { MOCK_ORDERS } from "@/data/mockData";

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [formData, setFormData] = useState({
    id: "", date: "", supplier: "", total: "0 ₫", creator: "NV01"
  });

  useEffect(() => {
    setOrders([...MOCK_ORDERS]);
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.date.includes(searchQuery)
  );

  const openAddModal = () => {
    setCurrentOrder(null);
    setFormData({
      id: `PN${String(MOCK_ORDERS.length + 1).padStart(3, "0")}`,
      date: new Date().toLocaleDateString("vi-VN"), supplier: "", total: "0 ₫", creator: "NV03"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setCurrentOrder(order);
    setFormData({ ...order });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phiếu nhập này không?")) {
      const updated = orders.filter((o) => o.id !== id);
      setOrders(updated);
      const index = MOCK_ORDERS.findIndex((o) => o.id === id);
      if (index !== -1) MOCK_ORDERS.splice(index, 1);
    }
  };

  const handleSave = () => {
    if (!formData.supplier || !formData.date) {
      alert("Vui lòng nhập đủ Nhà cung cấp và Ngày!");
      return;
    }

    if (currentOrder) {
      const updated = orders.map((o) => (o.id === formData.id ? formData : o));
      setOrders(updated);
      const index = MOCK_ORDERS.findIndex((o) => o.id === formData.id);
      if (index !== -1) MOCK_ORDERS[index] = formData;
    } else {
      const updated = [...orders, formData];
      setOrders(updated);
      MOCK_ORDERS.push(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-red-500" />
            Phiếu nhập
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý lịch sử nhập hàng từ nhà cung cấp
          </p>
        </div>

        {/* Add button */}
        <Button 
          onClick={openAddModal}
          className="h-10 gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md shadow-red-200/40 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tạo phiếu nhập
        </Button>
      </div>

      {/* Controls bar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm theo mã PN, nhà cung cấp hoặc ngày..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm focus-visible:border-red-300 focus-visible:ring-red-100"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[100px]">Mã PN</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[120px]">Ngày nhập</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nhà cung cấp</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[150px]">Tổng tiền</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[120px]">Người lập</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[130px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ClipboardList className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium">Không tìm thấy phiếu nhập</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="text-xs font-bold text-slate-500">{order.id}</TableCell>
                  <TableCell className="text-sm font-semibold text-slate-700">{order.date}</TableCell>
                  <TableCell className="text-sm font-semibold text-slate-800">{order.supplier}</TableCell>
                  <TableCell className="text-right text-sm font-bold text-red-600">{order.total}</TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      {order.creator}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer" title="Chi tiết">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <button 
                        onClick={() => openEditModal(order)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer" title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer" title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentOrder ? "Chỉnh sửa Phiếu nhập" : "Tạo phiếu nhập mới"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mã Phiếu Nhập</label>
              <Input value={formData.id} disabled className="bg-slate-100 font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Ngày nhập *</label>
              <Input
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Nhà cung cấp *</label>
            <Input
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              placeholder="VD: Công ty ABC..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Tổng tiền</label>
              <Input
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                placeholder="VD: 15.000.000 ₫"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Người lập</label>
              <Input
                value={formData.creator}
                onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
              Lưu dữ liệu
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
