import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Store,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Receipt,
  Users,
  Package,
  CreditCard,
  Banknote,
  QrCode,
  Phone,
  Printer,
  ShoppingBag,
  X,
  Sparkles,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomersPage from "@/components/admin/CustomersPage";
import InvoicesPage from "@/components/admin/InvoicesPage";
import { MOCK_PRODUCTS } from "@/data/mockData";

// ── Mock Data ──────────────────────────────────────────────
const PRODUCTS = MOCK_PRODUCTS;

const CATEGORIES = ["Tất cả", "Đồ uống", "Đồ ăn vặt", "Thức ăn nhanh", "Đồ dùng cá nhân"];

const NAV_ITEMS = [
  { id: "ban-hang", label: "Bán Hàng", icon: ShoppingCart },
  { id: "hoa-don", label: "Hóa Đơn", icon: Receipt },
  { id: "khach-hang", label: "Khách Hàng", icon: Users },
];

// ── Helpers ────────────────────────────────────────────────
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

// ── Sidebar ────────────────────────────────────────────────
function POSSidebar({ activeNav, onNavChange }) {
  return (
    <aside className="w-[220px] min-w-[220px] bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-200/40 flex-shrink-0">
            <Store className="w-4.5 h-4.5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-gray-900 leading-tight tracking-tight">
              Mini <span className="text-red-600">24h</span>
            </h1>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Hà Nội
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2.5 mb-2">
          Menu
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-red-600 text-white shadow-md shadow-red-200/50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 border border-red-100/50">
          <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">
            Ca làm việc
          </p>
          <p className="text-xs text-slate-600 mt-0.5">
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </aside>
  );
}

// ── Product Card ───────────────────────────────────────────
function ProductCard({ product, onAddToCart }) {
  return (
    <button
      id={`product-${product.id}`}
      onClick={() => onAddToCart(product)}
      className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-red-100/30 hover:border-red-200 transition-all duration-300 cursor-pointer text-left relative flex flex-col"
    >
      {/* Product Image */}
      <div className="aspect-square bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="hidden items-center justify-center absolute inset-0 bg-slate-100">
          <ShoppingBag className="w-8 h-8 text-slate-300" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <Plus className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
            {product.id}
          </p>
          <h3 className="text-sm font-semibold text-slate-800 mt-0.5 leading-snug line-clamp-2">
            {product.name}
          </h3>
        </div>
        <div className="flex items-end justify-between mt-2">
          <p className="text-base font-bold text-red-600">
            {formatVND(product.price)}
          </p>
          {/* Stock badge */}
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-red-50 text-red-500 px-1.5 py-0.5 rounded-md border border-red-100/50">
            Kho: {product.stock}
          </span>
        </div>
      </div>
    </button>
  );
}

// ── Cart Item ──────────────────────────────────────────────
function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
      {/* Thumbnail */}
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
        <p className="text-[11px] text-red-500 font-medium">{formatVND(item.price)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateQty(item.id, -1)}
          className="w-6 h-6 rounded-md bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-7 text-center text-xs font-bold text-slate-700">
          {item.qty}
        </span>
        <button
          onClick={() => onUpdateQty(item.id, 1)}
          className="w-6 h-6 rounded-md bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Line total */}
      <p className="text-xs font-bold text-slate-700 w-16 text-right">
        {formatVND(item.price * item.qty)}
      </p>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="w-6 h-6 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-100 text-slate-300 hover:text-red-500 flex items-center justify-center transition-all cursor-pointer"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

// ── Main POS View ──────────────────────────────────────────
export default function POSView() {
  const [activeNav, setActiveNav] = useState("ban-hang");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [cartItems, setCartItems] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        activeCategory === "Tất cả" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  // Cart operations
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + 1, product.stock) }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          const newQty = item.qty + delta;
          if (newQty <= 0) return null;
          return { ...item, qty: Math.min(newQty, item.stock) };
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((s, item) => s + item.price * item.qty, 0);
  const total = subtotal; // Could add tax/discount here

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert(
      `✅ Thanh toán thành công!\n\nPhương thức: ${
        paymentMethod === "cash" ? "Tiền mặt" : paymentMethod === "card" ? "Thẻ" : "QR"
      }\nTổng: ${formatVND(total)}\nSố mặt hàng: ${cartItems.length}`
    );
    setCartItems([]);
    setCustomerPhone("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      {/* ─── LEFT SIDEBAR ─── */}
      <POSSidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {activeNav === "ban-hang" && (
        <>
          {/* ─── MAIN CONTENT ─── */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Search bar */}
        <div className="px-5 pt-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="pos-search"
              placeholder="Tìm sản phẩm theo tên hoặc mã..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl text-sm focus-visible:border-red-300 focus-visible:ring-red-100 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {/* Category filter chips */}
        <div className="px-5 pb-3 flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200/40"
                    : "bg-white text-slate-600 border-slate-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                {cat}
              </button>
            );
          })}
          <span className="text-xs text-slate-400 ml-auto">
            {filteredProducts.length} sản phẩm
          </span>
        </div>

        {/* Product grid */}
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Thử tìm kiếm với từ khóa khác
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ─── RIGHT CART PANEL ─── */}
      <aside className="w-[360px] min-w-[360px] bg-white border-l border-slate-200 flex flex-col h-full">
        {/* Cart header */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-red-500" />
              </div>
              <h2 className="text-sm font-bold text-slate-800">Giỏ Hàng</h2>
            </div>
            {cartItems.length > 0 && (
              <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
                {cartItems.reduce((s, i) => s + i.qty, 0)} SP
              </span>
            )}
          </div>

          {/* Customer phone lookup */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              id="customer-phone"
              placeholder="Tìm theo SĐT khách hàng..."
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="pl-9 h-9 text-xs bg-slate-50 border-slate-200 rounded-lg focus-visible:border-red-300 focus-visible:ring-red-100"
            />
          </div>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-2">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
                <ShoppingBag className="w-7 h-7 text-slate-200" />
              </div>
              <p className="text-xs font-semibold text-slate-400">
                Giỏ hàng trống
              </p>
              <p className="text-[11px] text-slate-300 mt-1">
                Nhấn vào sản phẩm để thêm
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Checkout section */}
        <div className="border-t border-slate-200 p-4 space-y-3 bg-slate-50/50">
          {/* Payment method header */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Thanh toán
            </p>
          </div>

          {/* Payment method buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "cash", label: "Tiền mặt", icon: Banknote },
              { id: "card", label: "Thẻ", icon: CreditCard },
              { id: "qr", label: "QR", icon: QrCode },
            ].map((method) => {
              const isActive = paymentMethod === method.id;
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-1 py-2 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? "bg-red-50 text-red-600 border-red-200 shadow-sm"
                      : "bg-white text-slate-500 border-slate-200 hover:border-red-200 hover:text-red-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {method.label}
                </button>
              );
            })}
          </div>

          {/* Totals */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Tạm tính</span>
              <span className="font-semibold text-slate-700">{formatVND(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Giảm giá</span>
              <span className="font-semibold text-emerald-600">0₫</span>
            </div>
            <div className="h-px bg-slate-200 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-800">Tổng cộng</span>
              <span className="text-lg font-extrabold text-red-600">
                {formatVND(total)}
              </span>
            </div>
          </div>

          {/* Checkout button */}
          <Button
            id="checkout-btn"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full h-12 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-200/50 hover:shadow-red-300/50 transition-all duration-300 disabled:opacity-40 disabled:shadow-none cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            <Printer className="w-4 h-4 mr-2" />
            THANH TOÁN & IN HÓA ĐƠN
          </Button>
        </div>
      </aside>
        </>
      )}

      {/* ─── TAB: HÓA ĐƠN ─── */}
      {activeNav === "hoa-don" && (
        <main className="flex-1 overflow-y-auto p-6 flex flex-col min-w-0 bg-slate-50 z-10">
          <InvoicesPage />
        </main>
      )}

      {/* ─── TAB: KHÁCH HÀNG ─── */}
      {activeNav === "khach-hang" && (
        <main className="flex-1 overflow-y-auto p-6 flex flex-col min-w-0 bg-white shadow-[0_0_15px_rgba(0,0,0,0.02)] z-10">
          <CustomersPage />
        </main>
      )}
    </div>
  );
}
