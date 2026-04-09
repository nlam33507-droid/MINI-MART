import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import GlobalHeader from "@/components/GlobalHeader";
import POSView from "@/components/POSView";
import AdminView from "@/components/AdminView";
import { LayoutDashboard } from "lucide-react";

// Placeholder views (to be built in future steps)
function DashboardPlaceholder({ currentUser }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center space-y-4 animate-fade-in-up">
        <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
          <LayoutDashboard className="w-10 h-10 text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Xin chào, {currentUser.name}!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Vai trò: {currentUser.roleLabel}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Đăng nhập lúc: {currentUser.loginTime}
          </p>
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
          <p className="text-sm text-red-700 font-medium">
            🏪 Trang quản lý đang được phát triển...
          </p>
          <p className="text-xs text-red-500/70 mt-1">
            Các chức năng sẽ được cập nhật sớm
          </p>
        </div>
      </div>
    </div>
  );
}

// Render the correct view based on currentView
function MainContent({ currentView, currentUser }) {
  switch (currentView) {
    case "POS":
      return <POSView />;
    case "ADMIN":
      return <AdminView currentUser={currentUser} />;
    case "DASHBOARD":
    default:
      return <DashboardPlaceholder currentUser={currentUser} />;
  }
}

export default function App() {
  // Step 1: State Management
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState("DASHBOARD");

  // Login handler
  const handleLogin = (user) => {
    setCurrentUser(user);
    // Default view based on role
    if (user.role === "CASHIER") {
      setCurrentView("POS");
    } else {
      setCurrentView("ADMIN");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("DASHBOARD");
  };

  // Step 2: If not logged in, show Login screen
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Step 3: Logged in — show Header + Content
  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <GlobalHeader currentUser={currentUser} onLogout={handleLogout} />

      {/* Main Content Area */}
      <MainContent currentView={currentView} currentUser={currentUser} />
    </div>
  );
}
