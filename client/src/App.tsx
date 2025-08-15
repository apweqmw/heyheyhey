import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "./lib/i18n";
import { SEOProvider } from "./lib/seo";
import Home from "@/pages/home";
import FirmDetail from "@/pages/firm-detail";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/:locale" component={Home} />
      <Route path="/:locale/firms/:slug" component={FirmDetail} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <SEOProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SEOProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
