import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  UserPlus,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { formatVND, MOCK_PRODUCTS } from "@/data/mockData";

export default function ReportsPage() {
  const lowStockCount = MOCK_PRODUCTS.filter((p) => p.stock <= p.minStock).length;

  const summaryCards = [
    {
      id: "revenue",
      title: "Tổng doanh thu",
      value: formatVND(12500000),
      trend: "+15% so với tuần trước",
      icon: DollarSign,
      color: "bg-red-50 text-red-600",
    },
    {
      id: "orders",
      title: "Tổng đơn hàng",
      value: "342",
      trend: "+5% so với tuần trước",
      icon: ShoppingCart,
      color: "bg-red-50 text-red-600",
    },
    {
      id: "customers",
      title: "Khách hàng mới",
      value: "45",
      trend: "+12% so với tuần trước",
      icon: UserPlus,
      color: "bg-red-50 text-red-600",
    },
    {
      id: "alerts",
      title: "Cảnh báo tồn kho",
      value: lowStockCount.toString(),
      trend: "Sản phẩm cần nhập thêm",
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
    },
  ];

  // Dummy data for simple bar chart
  const weeklySales = [
    { day: "Thứ 2", height: "40%", tooltip: "1.200.000đ" },
    { day: "Thứ 3", height: "60%", tooltip: "1.800.000đ" },
    { day: "Thứ 4", height: "30%", tooltip: "900.000đ" },
    { day: "Thứ 5", height: "80%", tooltip: "2.400.000đ" },
    { day: "Thứ 6", height: "100%", tooltip: "3.000.000đ" },
    { day: "Thứ 7", height: "70%", tooltip: "2.100.000đ" },
    { day: "CN", height: "50%", tooltip: "1.500.000đ" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-red-500" />
          Báo cáo thống kê
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Tổng quan tình hình kinh doanh của cửa hàng
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-500">
                  {card.title}
                </h3>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                <div
                  className={`flex items-center gap-1 mt-1 text-xs font-medium ${
                    card.id === "alerts" ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {card.id !== "alerts" ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  )}
                  {card.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simple Bar Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800">
            Doanh thu 7 ngày qua
          </h3>
          <div className="flex items-end justify-between h-64 mt-6 pt-4 border-b border-gray-200">
            {weeklySales.map((item, idx) => (
              <div
                key={idx}
                className="w-12 bg-red-500 rounded-t-md hover:bg-red-600 transition-all relative group"
                style={{ height: item.height }}
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-2.5 rounded shadow-lg pointer-events-none whitespace-nowrap z-10">
                  {item.tooltip}
                </div>
              </div>
            ))}
          </div>
          {/* X-axis Labels */}
          <div className="flex items-center justify-between mt-3 px-1">
            {weeklySales.map((item, idx) => (
              <span
                key={idx}
                className="w-12 text-center text-sm text-gray-500"
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>

        {/* Top Products List */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            Top Sản phẩm bán chạy
          </h3>
          <div className="space-y-4">
            {MOCK_PRODUCTS.slice(0, 5).map((product, idx) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                  #{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-500 flex justify-between">
                    <span>{product.id}</span>
                    <span className="font-bold text-red-600">
                      {formatVND(product.price * (20 - idx * 2))}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
