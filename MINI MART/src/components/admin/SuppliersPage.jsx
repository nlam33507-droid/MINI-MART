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
import { Search, Plus, Truck, MapPin, Phone, Edit, Trash2 } from "lucide-react";
import { MOCK_SUPPLIERS } from "@/data/mockData";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(MOCK_SUPPLIERS);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [formData, setFormData] = useState({
    id: "", name: "", phone: "", address: ""
  });

  useEffect(() => {
    setSuppliers([...MOCK_SUPPLIERS]);
  }, []);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setCurrentSupplier(null);
    setFormData({
      id: `NCC${String(MOCK_SUPPLIERS.length + 1).padStart(2, "0")}`,
      name: "", phone: "", address: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (supplier) => {
    setCurrentSupplier(supplier);
    setFormData({ ...supplier });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này không?")) {
      const updated = suppliers.filter((s) => s.id !== id);
      setSuppliers(updated);
      const index = MOCK_SUPPLIERS.findIndex((s) => s.id === id);
      if (index !== -1) MOCK_SUPPLIERS.splice(index, 1);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone) {
      alert("Vui lòng nhập đủ Tên và Số điện thoại!");
      return;
    }

    if (currentSupplier) {
      const updated = suppliers.map((s) => (s.id === formData.id ? formData : s));
      setSuppliers(updated);
      const index = MOCK_SUPPLIERS.findIndex((s) => s.id === formData.id);
      if (index !== -1) MOCK_SUPPLIERS[index] = formData;
    } else {
      const updated = [...suppliers, formData];
      setSuppliers(updated);
      MOCK_SUPPLIERS.push(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-red-500" />
            Nhà cung cấp
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý danh sách nhà cung cấp của cửa hàng
          </p>
        </div>

        {/* Add button */}
        <Button 
          onClick={openAddModal}
          className="h-10 gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md shadow-red-200/40 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm nhà cung cấp
        </Button>
      </div>

      {/* Controls bar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm nhà cung cấp..."
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
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[100px]">
                Mã NCC
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tên NCC
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[150px]">
                Số điện thoại
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Địa chỉ
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[100px]">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Truck className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium">Không tìm thấy nhà cung cấp</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="text-xs font-bold text-slate-500">
                    {supplier.id}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-slate-800">
                    {supplier.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {supplier.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      {supplier.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => openEditModal(supplier)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer" title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(supplier.id)}
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
        title={currentSupplier ? "Chỉnh sửa Nhà cung cấp" : "Thêm Nhà cung cấp mới"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mã NCC</label>
              <Input value={formData.id} disabled className="bg-slate-100 font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Tên nhà cung cấp *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Công ty ABC"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Số điện thoại *</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="024..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Địa chỉ</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Nhập địa chỉ chi tiết"
            />
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
