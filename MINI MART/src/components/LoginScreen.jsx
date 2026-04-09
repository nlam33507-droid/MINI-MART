import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  User,
  Lock,
  ShieldCheck,
  LogIn,
  MapPin,
  Clock,
} from "lucide-react";

const ROLES = [
  { value: "MANAGER", label: "Quản lý" },
  { value: "CASHIER", label: "Nhân viên bán hàng" },
  { value: "INVENTORY", label: "Nhân viên kho" },
];

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password || !role) return;

    setIsLoading(true);
    // Simulate login delay for visual feedback
    setTimeout(() => {
      const roleLabel = ROLES.find((r) => r.value === role)?.label || role;
      onLogin({
        name: username,
        role: role,
        roleLabel: roleLabel,
        loginTime: new Date().toLocaleString("vi-VN"),
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-50/60 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-50/30 rounded-full blur-2xl" />
      </div>

      <div
        className="w-full max-w-md animate-fade-in-up relative z-10"
        style={{ animationDelay: "0.1s" }}
      >
        <Card className="shadow-2xl border-0 ring-1 ring-black/5 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-2 pt-8 px-8">
            {/* Logo & Branding */}
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-200/50 animate-pulse-glow">
                  <Store className="w-10 h-10 text-white" strokeWidth={1.8} />
                </div>
                {/* 24H badge */}
                <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  24H
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-none">
                  MINI MART{" "}
                  <span className="text-red-600">24H</span>
                </h1>
                <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Chi nhánh Cầu Giấy, Hà Nội</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Đăng nhập hệ thống
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8 pt-4">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-username"
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  Tên đăng nhập
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <Input
                    id="login-username"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-11 text-sm bg-slate-50/80 border-slate-200 focus-visible:bg-white focus-visible:border-red-300 focus-visible:ring-red-100 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-password"
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  Mật khẩu
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 text-sm bg-slate-50/80 border-slate-200 focus-visible:bg-white focus-visible:border-red-300 focus-visible:ring-red-100 transition-all"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-role"
                  className="text-xs font-semibold text-gray-500 uppercase tracking-wide"
                >
                  Vai trò
                </label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10 pointer-events-none group-focus-within:text-red-500 transition-colors" />
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger
                      id="login-role"
                      className="w-full pl-10 h-11 text-sm bg-slate-50/80 border-slate-200 focus-visible:bg-white focus-visible:border-red-300 focus-visible:ring-red-100 transition-all cursor-pointer"
                    >
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Login Button */}
              <Button
                id="login-submit-btn"
                type="submit"
                disabled={!username || !password || !role || isLoading}
                className="w-full h-12 text-base font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-200/50 hover:shadow-red-300/50 transition-all duration-300 disabled:opacity-40 disabled:shadow-none cursor-pointer mt-2 relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang đăng nhập...</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    <LogIn className="w-5 h-5 mr-2" />
                    ĐĂNG NHẬP
                  </>
                )}
              </Button>
            </form>

            {/* Footer info */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Hệ thống quản lý cửa hàng tiện lợi</span>
              </div>
              <p className="text-center text-[11px] text-muted-foreground/60 mt-1.5">
                Phiên bản 2.0 — © 2026 Mini Mart 24H
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
