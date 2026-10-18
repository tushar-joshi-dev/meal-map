import { ToastContainer } from 'react-toastify';
import './App.css';
import useThemeDetector from './hooks/ThemeDetector';
import PlanBuilderPage from './pages/PlanBuilder';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  const isDarkTheme = useThemeDetector();
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen relative w-full text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      {/* Pinned directly to the top edge */}
      <Header />

      {/* 
      Main content padding clears the fixed header and ensures content never gets clipped behind the footer at the bottom 
    */}
      <main className="w-full pt-12 pb-[140px]">
        <PlanBuilderPage />
      </main>

      {/* Pinned directly to the bottom edge */}
      <Footer />

      <ToastContainer newestOnTop={true} draggable={false} theme={isDarkTheme ? "dark" : "light"} />
    </div>
  )
}

export default App
