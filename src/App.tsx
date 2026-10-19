import { ToastContainer } from 'react-toastify';
import './App.css';
import useThemeDetector from './hooks/ThemeDetector';
import PlanBuilderPage from './pages/PlanBuilder';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { MealGridProvider } from './context/MealGridContext';

function App() {
  const isDarkTheme = useThemeDetector();
  return (
    <MealGridProvider>
      <div className="bg-white dark:bg-zinc-950 min-h-screen relative w-full text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      {/* Pinned directly to the top edge */}
      <Header />

      {/* 
      Main content padding clears the fixed header and ensures content never gets clipped behind the footer at the bottom 
    */}
      <main className="w-full pt-20 pb-[175px] px-6">
        <PlanBuilderPage />
      </main>

      {/* Pinned directly to the bottom edge */}
      <Footer />

      <ToastContainer newestOnTop={true} draggable={false} theme={isDarkTheme ? "dark" : "light"} />
    </div>
    </MealGridProvider>
    
  )
}

export default App
