import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ThemeProvider from "./context/ThemeProvider";
import { DesktopSidebar, MobileSidebar } from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-light dark:bg-bg-dark">
      <DesktopSidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
