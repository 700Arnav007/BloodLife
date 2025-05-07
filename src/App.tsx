
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DonorRegister from "./pages/DonorRegister";
import PatientRegister from "./pages/PatientRegister";
import FindDonors from "./pages/FindDonors";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NgoRegister from "./pages/NgoRegister";
import HospitalRegister from "./pages/HospitalRegister";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donor-register" element={<DonorRegister />} />
          <Route path="/patient-register" element={<PatientRegister />} />
          <Route path="/ngo-register" element={<NgoRegister />} />
          <Route path="/hospital-register" element={<HospitalRegister />} />
          <Route path="/find-donors" element={<FindDonors />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
