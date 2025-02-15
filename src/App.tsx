import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/components/home.tsx";
import { ThemeProvider } from "@/components/theme-providor.tsx";
import { Hero } from "@/components/hero.tsx";
import AuthMiddleware from "@/lib/authMiddleware.tsx";
import { Navbar } from "@/components/navbar.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/hospitals"
            element={
              <AuthMiddleware>
                <Home />
              </AuthMiddleware>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
