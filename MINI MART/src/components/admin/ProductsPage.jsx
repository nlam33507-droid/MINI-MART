import { useState, useMemo, useEffect } from "react";
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
import {
  Search,
  Plus,
  ShoppingBag,
  Tag,
  Pencil,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { MOCK_PRODUCTS, formatVND } from "@/data/mockData";

const CATEGORY_COLORS = {
  "Đồ uống": "bg-blue-50 text-blue-600 border-blue-100",
  "Đồ ăn vặt": "bg-amber-50 text-amber-600 border-amber-100",
  "Thức ăn nhanh": "bg-orange-50 text-orange-600 border-orange-100",
  "Đồ dùng cá nhân": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Văn phòng phẩm": "bg-violet-50 text-violet-600 border-violet-100",
};

export default function ProductsPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tất cả");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: "", name: "", category: "Đồ uống", price: 0, cost: 0, stock: 0, minStock: 20, location: "Kệ A", img: ""
  });

  // Re-sync if MOCK_PRODUCTS changes from elsewhere (e.g., POS)
  useEffect(() => {
    setProducts([...MOCK_PRODUCTS]);
  }, []);

  const categoriesOption = [
    "Tất cả",
    ...new Set(MOCK_PRODUCTS.map((p) => p.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        filterCategory === "Tất cả" || p.category === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, filterCategory, products]);

  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      id: `SP${String(MOCK_PRODUCTS.length + 1).padStart(2, "0")}`,
      name: "", category: "Đồ uống", price: 0, cost: 0, stock: 0, minStock: 20, location: "Kệ A", img: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      setProducts(updatedProducts);
      
      const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
      if (index !== -1) MOCK_PRODUCTS.splice(index, 1);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert("Vui lòng điền đủ thông tin tên, giá bán và số lượng!");
      return;
    }

    const payload = { ...formData, price: Number(formData.price), cost: Number(formData.cost), stock: Number(formData.stock) };

    if (currentProduct) {
      // Edit
      const updatedProducts = products.map((p) => p.id === payload.id ? payload : p);
      setProducts(updatedProducts);
      const index = MOCK_PRODUCTS.findIndex((p) => p.id === payload.id);
      if (index !== -1) MOCK_PRODUCTS[index] = payload;
    } else {
      // Add
      const updatedProducts = [...products, payload];
      setProducts(updatedProducts);
      MOCK_PRODUCTS.push(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            Sản phẩm
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý danh sách sản phẩm của cửa hàng
          </p>
        </div>

        {/* Add product button */}
        <Button
          id="add-product-btn"
          onClick={openAddModal}
          className="h-10 gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md shadow-red-200/40 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm mới
        </Button>
      </div>

      {/* Controls bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="product-search"
            placeholder="Tìm kiếm theo mã hoặc tên sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm focus-visible:border-red-300 focus-visible:ring-red-100"
          />
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-2">
          {categoriesOption.map((cat) => {
            const isActive = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-red-600 text-white border-red-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-red-200 hover:text-red-600"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-muted-foreground">
        Hiển thị {filteredProducts.length} / {products.length} sản phẩm
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[90px]">
                Mã SP
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tên sản phẩm
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[150px]">
                Danh mục
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-[120px]">
                Giá bán
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[80px]">
                Tồn kho
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[100px]">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ShoppingBag className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium">
                      Không tìm thấy sản phẩm
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="text-xs font-bold text-slate-500">
                    {product.id}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-slate-800">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full border ${
                        CATEGORY_COLORS[product.category] ||
                        "bg-slate-50 text-slate-600 border-slate-100"
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm font-bold text-red-600">
                    {formatVND(product.price)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center min-w-[36px] text-xs font-bold px-2 py-0.5 rounded-md ${
                        product.stock <= product.minStock
                          ? "bg-red-100 text-red-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="w-7 h-7 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button 
                         onClick={() => handleDelete(product.id)}
                         className="w-7 h-7 rounded-md hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
        title={currentProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Mã sản phẩm</label>
              <Input
                value={formData.id}
                disabled
                className="bg-slate-100 text-slate-500 font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Tên sản phẩm *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Danh mục</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="VD: Đồ uống, Đồ ăn vặt..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Số lượng kho *</label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Giá bán *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Giá nhập</label>
              <Input
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase">Đường dẫn ảnh (URL)</label>
            <Input
              value={formData.img}
              onChange={(e) => setFormData({ ...formData, img: e.target.value })}
              placeholder="https://..."
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
