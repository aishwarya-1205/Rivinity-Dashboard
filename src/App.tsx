import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import RivinityLM from "./pages/RivinityLM.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppBuilder from "./pages/AppBuilder.tsx";
import { FileProvider } from "./components/context/FileContext.tsx";
import AudioLab from "./pages/AudioLab.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FileProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app-builder" element={<AppBuilder />} />
            <Route path="/audio-lab" element={<AudioLab />} />
            <Route path="/rivinity-lm" element={<RivinityLM />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
