import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
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
  AlertTriangle,
  Filter,
  Package,
  MapPin,
  ArrowUpDown,
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/mockData";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [sortByStock, setSortByStock] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = MOCK_PRODUCTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLowStock = showLowStockOnly ? p.stock <= p.minStock : true;
      return matchSearch && matchLowStock;
    });

    if (sortByStock) {
      results = [...results].sort((a, b) => a.stock - b.stock);
    }

    return results;
  }, [searchQuery, showLowStockOnly, sortByStock]);

  const lowStockCount = MOCK_PRODUCTS.filter(
    (p) => p.stock <= p.minStock
  ).length;

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-red-500" />
            Kho hàng
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Quản lý tồn kho và vị trí sản phẩm
          </p>
        </div>

        {/* Low stock alert summary */}
        {lowStockCount > 0 && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold text-red-700">
              {lowStockCount} sản phẩm sắp hết hàng
            </span>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            id="inventory-search"
            placeholder="Tìm kiếm theo mã hoặc tên sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-white border-slate-200 rounded-lg text-sm focus-visible:border-red-300 focus-visible:ring-red-100"
          />
        </div>

        {/* Low stock filter */}
        <Button
          id="filter-low-stock"
          variant={showLowStockOnly ? "default" : "outline"}
          onClick={() => setShowLowStockOnly(!showLowStockOnly)}
          className={`h-10 gap-2 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
            showLowStockOnly
              ? "bg-red-600 text-white hover:bg-red-700 border-red-600"
              : "border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          Bộ lọc sắp hết hàng
          {lowStockCount > 0 && (
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                showLowStockOnly
                  ? "bg-white/20 text-white"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {lowStockCount}
            </span>
          )}
        </Button>

        {/* Sort toggle */}
        <Button
          variant="outline"
          onClick={() => setSortByStock(!sortByStock)}
          className={`h-10 gap-2 text-xs font-semibold rounded-lg cursor-pointer ${
            sortByStock
              ? "border-red-200 text-red-600 bg-red-50"
              : "border-slate-200 text-slate-600"
          }`}
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          Sắp xếp theo tồn kho
        </Button>
      </div>

      {/* Results count */}
      <div className="text-xs text-muted-foreground">
        Hiển thị {filteredProducts.length} / {MOCK_PRODUCTS.length} sản phẩm
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
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[100px]">
                Tồn kho
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[120px]">
                Tồn tối thiểu
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider w-[160px]">
                Vị trí
              </TableHead>
              <TableHead className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-[100px]">
                Trạng thái
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Package className="w-8 h-8 text-slate-200" />
                    <p className="text-sm font-medium">
                      Không tìm thấy sản phẩm
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const isLowStock = product.stock <= product.minStock;
                return (
                  <TableRow
                    key={product.id}
                    className={`transition-colors ${
                      isLowStock
                        ? "bg-red-50 hover:bg-red-100/70"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <TableCell
                      className={`text-xs font-bold ${
                        isLowStock ? "text-red-700" : "text-slate-500"
                      }`}
                    >
                      {product.id}
                    </TableCell>
                    <TableCell
                      className={`text-sm font-semibold ${
                        isLowStock ? "text-red-800" : "text-slate-800"
                      }`}
                    >
                      {product.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center justify-center min-w-[40px] text-sm font-bold px-2 py-0.5 rounded-md ${
                          isLowStock
                            ? "bg-red-200/60 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell
                      className={`text-center text-sm ${
                        isLowStock
                          ? "text-red-600 font-semibold"
                          : "text-slate-500"
                      }`}
                    >
                      {product.minStock}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center gap-1.5 text-xs ${
                          isLowStock ? "text-red-600" : "text-slate-500"
                        }`}
                      >
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {product.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          Sắp hết
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          Đủ hàng
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
