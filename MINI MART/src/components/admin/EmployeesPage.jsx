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
import { Search, Plus, UserCog, Edit, Trash2 } from "lucide-react";
import { MOCK_EMPLOYEES } from "@/data/mockData";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    id: "", name: "", role: "Nhân viên bán hàng", phone: "", status: "Đang làm việc"
  });

  useEffect(() => {
    setEmployees([...MOCK_EMPLOYEES]);
  }, []);

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery)
  );

  const openAddModal = () => {
    setCurrentEmployee(null);
    setFormData({
      id: `NV${String(MOCK_EMPLOYEES.length + 1).padStart(2, "0")}`,
      name: "", role: "Nhân viên bán hàng", phone: "", status: "Đang làm việc"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setFormData({ ...employee });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
      const updated = employees.filter((e) => e.id !== id);
      setEmployees(updated);
      
      const index = MOCK_EMPLOYEES.findIndex((e) => e.id === id);
      if (index !== -1) MOCK_EMPLOYEES.splice(index, 1);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone) {
      alert("Vui lòng nhập đủ Tên và Số điện thoại!");
      return;
    }

    if (currentEmployee) {
      const updated = employees.map((e) => e.id === formData.id ? formData : e);
      setEmployees(updated);
      const index = MOCK_EMPLOYEES.findIndex((e) => e.id === formData.id);
      if (index !== -1) MOCK_EMPLOYEES[index] = formData;
    } else {
      const updated = [...employees, formData];
      setEmployees(updated);
      MOCK_EMPLOYEES.push(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-red-500" />
            Nhân viên
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý tài khoản và phân quyền nhân viên
          </p>
        </div>

        {/* Add button */}
        <Button 
          onClick={openAddModal}
          className="h-10 gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md shadow-red-200/40 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm nhân viên
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
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[100px]">Mã NV</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Họ tên</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chức vụ</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số điện thoại</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[150px]">Trạng thái</TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[100px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <UserCog className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium">Không tìm thấy nhân viên</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="text-xs font-bold text-slate-500">{employee.id}</TableCell>
                  <TableCell className="text-sm font-semibold text-slate-800">{employee.name}</TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      {employee.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{employee.phone}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        employee.status === "Đang làm việc"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {employee.status === "Đang làm việc" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                      )}
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => openEditModal(employee)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer" title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(employee.id)}
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
        title={currentEmployee ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mã Nhân Viên</label>
              <Input value={formData.id} disabled className="bg-slate-100 font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Họ và Tên *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Chức vụ</label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="VD: Quản lý, Nhân viên bán hàng..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Trạng thái</label>
              <Input
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="VD: Đang làm việc, Đã nghỉ..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Số điện thoại *</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
