import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "./lib/i18n";
import { SEOProvider } from "./lib/seo";
import Home from "@/pages/home";
import FirmDetail from "@/pages/firm-detail";
import ReviewsOverview from "@/pages/reviews-overview";
import Guides from "@/pages/guides";
import News from "@/pages/news";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/:locale" component={Home} />
      <Route path="/:locale/firms/:slug" component={FirmDetail} />
      <Route path="/:locale/reviews" component={ReviewsOverview} />
      <Route path="/:locale/guides" component={Guides} />
      <Route path="/:locale/news" component={News} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="propfirm-mentor-theme">
        <I18nProvider>
          <SEOProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </SEOProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
