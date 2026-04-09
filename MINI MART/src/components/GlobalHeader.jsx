import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Store,
  LogOut,
  Clock,
  UserCircle,
  CheckCircle2,
  Timer,
} from "lucide-react";

export default function GlobalHeader({ currentUser, onLogout }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkTime, setCheckTime] = useState(null);

  const handleCheckInOut = () => {
    const now = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (!checkedIn) {
      setCheckedIn(true);
      setCheckTime(now);
    } else {
      setCheckedIn(false);
      setCheckTime(null);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + Store name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-md shadow-red-200/40 flex-shrink-0">
              <Store className="w-5 h-5 text-white" strokeWidth={1.8} />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-gray-900 leading-tight tracking-tight">
                Mini Mart
              </h2>
              <p className="text-[11px] text-muted-foreground leading-tight flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CN Cầu Giấy, Hà Nội
              </p>
            </div>
          </div>

          {/* Right side: User info + Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User info pill */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 rounded-full pl-1.5 pr-3 py-1 border border-slate-100">
              <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                <UserCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {currentUser.roleLabel}
                </p>
              </div>
            </div>

            {/* Check-in/out button */}
            <Button
              id="checkin-btn"
              variant="outline"
              onClick={handleCheckInOut}
              className={`h-9 gap-1.5 text-xs font-semibold rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                checkedIn
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
                  : "border-red-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
              }`}
            >
              {checkedIn ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    Đã chấm công
                  </span>
                  {checkTime && (
                    <span className="text-[10px] font-normal text-emerald-500 hidden lg:inline">
                      ({checkTime})
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Timer className="w-4 h-4" />
                  <span className="hidden sm:inline">Chấm công</span>
                </>
              )}
            </Button>

            {/* Logout button */}
            <Button
              id="logout-btn"
              variant="ghost"
              onClick={onLogout}
              className="h-9 gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
