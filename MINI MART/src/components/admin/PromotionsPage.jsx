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
import { Search, Plus, Percent, Calendar, Edit, Trash2 } from "lucide-react";
import { MOCK_PROMOTIONS } from "@/data/mockData";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState(MOCK_PROMOTIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(null);
  const [formData, setFormData] = useState({
    id: "", name: "", discount: "10%", startDate: "", endDate: "", status: "Sắp tới"
  });

  useEffect(() => {
    setPromotions([...MOCK_PROMOTIONS]);
  }, []);

  const filteredPromos = promotions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setCurrentPromo(null);
    setFormData({
      id: `KM${String(MOCK_PROMOTIONS.length + 1).padStart(2, "0")}`,
      name: "", discount: "10%", startDate: "", endDate: "", status: "Sắp tới"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (promo) => {
    setCurrentPromo(promo);
    setFormData({ ...promo });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khuyến mãi này không?")) {
      const updated = promotions.filter((p) => p.id !== id);
      setPromotions(updated);
      const index = MOCK_PROMOTIONS.findIndex((p) => p.id === id);
      if (index !== -1) MOCK_PROMOTIONS.splice(index, 1);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.discount) {
      alert("Vui lòng nhập đủ Tên chương trình và Mức giảm!");
      return;
    }

    if (currentPromo) {
      const updated = promotions.map((p) => (p.id === formData.id ? formData : p));
      setPromotions(updated);
      const index = MOCK_PROMOTIONS.findIndex((p) => p.id === formData.id);
      if (index !== -1) MOCK_PROMOTIONS[index] = formData;
    } else {
      const updated = [...promotions, formData];
      setPromotions(updated);
      MOCK_PROMOTIONS.push(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Percent className="w-5 h-5 text-red-500" />
            Khuyến mãi
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý các chương trình khuyến mãi và giảm giá
          </p>
        </div>

        {/* Add button */}
        <Button 
          onClick={openAddModal}
          className="h-10 gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md shadow-red-200/40 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tạo chương trình mới
        </Button>
      </div>

      {/* Controls bar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm chương trình khuyến mãi..."
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
                Mã KM
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tên chương trình
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[120px]">
                Mức giảm
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[150px]">
                Ngày bắt đầu
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[150px]">
                Ngày kết thúc
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[120px]">
                Trạng thái
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[100px]">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPromos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Percent className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium">Không tìm thấy khuyến mãi</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPromos.map((promo) => (
                <TableRow key={promo.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="text-xs font-bold text-slate-500">
                    {promo.id}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-slate-800">
                    {promo.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                      {promo.discount}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-sm text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {promo.startDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5 text-sm text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {promo.endDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-[11px] font-semibold border ${
                        promo.status === "Đang diễn ra"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : promo.status === "Sắp tới"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {promo.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => openEditModal(promo)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer" title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(promo.id)}
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
        title={currentPromo ? "Chỉnh sửa khuyến mãi" : "Tạo chương trình mới"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mã KM</label>
              <Input value={formData.id} disabled className="bg-slate-100 font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mức giảm *</label>
              <Input
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="VD: 10%, 20K..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Tên chương trình *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="VD: Giảm giá mùa hè rực rỡ"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Ngày bắt đầu</label>
              <Input
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Ngày kết thúc</label>
              <Input
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Trạng thái</label>
            <Input
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              placeholder="Đang diễn ra, Sắp tới, Đã kết thúc..."
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
