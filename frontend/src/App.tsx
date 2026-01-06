import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/ui/layout";
import { ThemeProvider } from "./context/theme-provider";
import WeatherDashboard from "./components/page/weather-dashboard";
import CityPage from "./components/page/city-page";

function App() {

  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route path="/" element={<WeatherDashboard/>} />
          <Route path="/city/:cityName" element={<CityPage/>} />
        </Routes>
      </Layout>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
