import Sidebar from "../components/Siderbar/Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}
