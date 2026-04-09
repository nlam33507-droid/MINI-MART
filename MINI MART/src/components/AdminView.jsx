import { useState } from "react";
import {
  Store,
  LayoutDashboard,
  ShoppingBag,
  Users,
  UserCog,
  Truck,
  Percent,
  Package,
  ClipboardList,
  Receipt,
  BarChart3,
} from "lucide-react";
import InventoryPage from "@/components/admin/InventoryPage";
import PurchaseOrdersPage from "@/components/admin/PurchaseOrdersPage";
import InvoicesPage from "@/components/admin/InvoicesPage";
import ProductsPage from "@/components/admin/ProductsPage";
import CustomersPage from "@/components/admin/CustomersPage";
import EmployeesPage from "@/components/admin/EmployeesPage";
import SuppliersPage from "@/components/admin/SuppliersPage";
import PromotionsPage from "@/components/admin/PromotionsPage";
import ReportsPage from "@/components/admin/ReportsPage";

// ── Role-based menu configuration ──────────────────────────
const MANAGER_MENUS = [
  { id: "san-pham", label: "Sản phẩm", icon: ShoppingBag },
  { id: "khach-hang", label: "Khách hàng", icon: Users },
  { id: "nhan-vien", label: "Nhân viên", icon: UserCog },
  { id: "nha-cung-cap", label: "Nhà cung cấp", icon: Truck },
  { id: "hoa-don", label: "Hóa đơn", icon: Receipt },
  { id: "phieu-nhap", label: "Phiếu nhập", icon: ClipboardList },
  { id: "khuyen-mai", label: "Khuyến mãi", icon: Percent },
  { id: "kho-hang", label: "Kho hàng", icon: Package },
  { id: "bao-cao", label: "Báo cáo", icon: BarChart3 },
];

const INVENTORY_MENUS = [
  { id: "kho-hang", label: "Kho hàng", icon: Package },
  { id: "phieu-nhap", label: "Phiếu nhập", icon: ClipboardList },
];

// ── Placeholder page ───────────────────────────────────────
function PlaceholderPage({ title, icon: Icon }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
          <Icon className="w-8 h-8 text-red-300" />
        </div>
        <h2 className="text-lg font-bold text-slate-700">{title}</h2>
        <p className="text-sm text-muted-foreground">
          Chức năng đang được phát triển...
        </p>
      </div>
    </div>
  );
}

// ── Admin Sidebar ──────────────────────────────────────────
function AdminSidebar({ menus, activeMenu, onMenuChange, role }) {
  return (
    <aside className="w-[240px] min-w-[240px] bg-white border-r border-slate-200 flex flex-col h-full">
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

      {/* Role badge */}
      <div className="px-4 pt-3 pb-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {role === "MANAGER" ? "Quản lý" : "Nhân viên kho"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2.5 mb-2">
          Chức năng
        </p>
        {menus.map((item) => {
          const isActive = activeMenu === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`admin-nav-${item.id}`}
              onClick={() => onMenuChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-red-50 text-red-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-red-500" : "text-slate-400"
                }`}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 border border-red-100/50">
          <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">
            Phiên làm việc
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

// ── Render content based on active menu ────────────────────
function AdminContent({ activeMenu, menus }) {
  switch (activeMenu) {
    case "kho-hang":
      return <InventoryPage />;
    case "phieu-nhap":
      return <PurchaseOrdersPage />;
    case "hoa-don":
      return <InvoicesPage />;
    case "san-pham":
      return <ProductsPage />;
    case "khach-hang":
      return <CustomersPage />;
    case "nhan-vien":
      return <EmployeesPage />;
    case "nha-cung-cap":
      return <SuppliersPage />;
    case "khuyen-mai":
      return <PromotionsPage />;
    case "bao-cao":
      return <ReportsPage />;
    default: {
      const currentMenu = menus.find((m) => m.id === activeMenu);
      return (
        <PlaceholderPage
          title={currentMenu?.label || "Trang"}
          icon={currentMenu?.icon || LayoutDashboard}
        />
      );
    }
  }
}

// ── Main AdminView ─────────────────────────────────────────
export default function AdminView({ currentUser }) {
  const role = currentUser?.role;
  const menus = role === "INVENTORY" ? INVENTORY_MENUS : MANAGER_MENUS;
  const defaultMenu = role === "INVENTORY" ? "kho-hang" : "san-pham";

  const [activeMenu, setActiveMenu] = useState(defaultMenu);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        menus={menus}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        role={role}
      />

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <AdminContent activeMenu={activeMenu} menus={menus} />
      </main>
    </div>
  );
}
