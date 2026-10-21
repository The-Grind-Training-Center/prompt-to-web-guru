import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Facilities from "./pages/Facilities";
import Services from "./pages/Services";
import Coaches from "./pages/Coaches";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import Privacy from "./pages/Privacy";
import Calendar from "./pages/Calendar";
import Camps from "./pages/Camps";
import Memberships from "./pages/Memberships";
import Technology from "./pages/Technology";
import JawBats from "./pages/JawBats";
import Backstop from "./pages/Backstop";
import Chris from "./pages/Chris";
import Membership from "./pages/Membership";
import CageMembership from "./pages/CageMembership";
import SoccerField from "./pages/SoccerField";
import Rentals from "./pages/Rentals";
import Cages from "./pages/Cages";
import BirthdayParties from "./pages/BirthdayParties";
import HalloweenCamp from "./pages/HalloweenCamp";
import { MetaPixelTracker } from "@/components/MetaPixelTracker";
import NotFound from "./pages/NotFound";
import { captureAttribution } from "@/lib/attribution";
import { PageMetadata } from "@/components/PageMetadata";

captureAttribution();
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageMetadata />
        <ScrollToTop />
        <MetaPixelTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/services" element={<Services />} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/jaw-bats" element={<JawBats />} />
          {/* Standalone paid-ads landing page: intentionally no Layout/Header/Footer */}
          <Route path="/backstop" element={<Backstop />} />
          <Route path="/chris" element={<Chris />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/cage-membership" element={<CageMembership />} />
          <Route path="/soccer-field" element={<SoccerField />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/cages" element={<Cages />} />
          <Route path="/birthday-parties" element={<BirthdayParties />} />
          <Route path="/halloween-camp" element={<HalloweenCamp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
