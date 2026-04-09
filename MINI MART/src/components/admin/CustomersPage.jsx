import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Users, History, Edit, Trash2 } from "lucide-react";
import { MOCK_CUSTOMERS } from "@/data/mockData";

export default function CustomersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    id: "", name: "", phone: "", address: "", points: 0, spent: "0 ₫"
  });

  useEffect(() => {
    setCustomers([...MOCK_CUSTOMERS]);
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const openAddModal = () => {
    setCurrentCustomer(null);
    setFormData({
      id: `KH${String(MOCK_CUSTOMERS.length + 1).padStart(2, "0")}`,
      name: "", phone: "", address: "", points: 0, spent: "0 ₫"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (customer) => {
    setCurrentCustomer(customer);
    setFormData({ ...customer });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
      const updated = customers.filter((c) => c.id !== id);
      setCustomers(updated);
      
      const index = MOCK_CUSTOMERS.findIndex((c) => c.id === id);
      if (index !== -1) MOCK_CUSTOMERS.splice(index, 1);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone) {
      alert("Vui lòng điền đủ Tên và Số điện thoại!");
      return;
    }

    if (currentCustomer) {
      // Edit
      const updated = customers.map((c) => c.id === formData.id ? formData : c);
      setCustomers(updated);
      const index = MOCK_CUSTOMERS.findIndex((c) => c.id === formData.id);
      if (index !== -1) MOCK_CUSTOMERS[index] = formData;
    } else {
      // Add
      const payload = { ...formData, points: Number(formData.points) };
      const updated = [...customers, payload];
      setCustomers(updated);
      MOCK_CUSTOMERS.push(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            Khách hàng
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý thông tin và lịch sử mua hàng của khách
          </p>
        </div>

        {/* Add button */}
        <Button 
          onClick={openAddModal}
          className="h-10 gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md shadow-red-200/40 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm khách hàng
        </Button>
      </div>

      {/* Controls bar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm theo tên, mã hoặc SĐT..."
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
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[100px]">Mã KH</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Họ tên</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số điện thoại</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Địa chỉ</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Điểm</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Tổng chi tiêu</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[120px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Users className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium">Không tìm thấy khách hàng</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="text-xs font-bold text-slate-500">{customer.id}</TableCell>
                  <TableCell className="text-sm font-semibold text-slate-800">{customer.name}</TableCell>
                  <TableCell className="text-sm text-slate-600">{customer.phone}</TableCell>
                  <TableCell className="text-sm text-slate-600">{customer.address}</TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                      {customer.points}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-bold text-slate-700">{customer.spent}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1.5">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer" title="Xem lịch sử">
                        <History className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(customer)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer" title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)}
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

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentCustomer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mã Khách Hàng</label>
              <Input
                value={formData.id}
                disabled
                className="bg-slate-100 text-slate-500 font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Họ và Tên *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Nguyễn Văn A..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Số điện thoại *</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="VD: 09..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Điểm tích lũy</label>
              <Input
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Địa chỉ</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Nhập địa chỉ..."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Hủy bỏ
            </Button>
            <Button
              onClick={handleSave}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Lưu dữ liệu
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
