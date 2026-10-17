import { ToastContainer } from 'react-toastify';
import './App.css';
import useThemeDetector from './hooks/ThemeDetector';

function App() {
  const isDarkTheme = useThemeDetector();
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen">
      <div>
        <p>HELLO, WORLD!</p>
      </div>
      <ToastContainer newestOnTop={true} draggable={false} theme={isDarkTheme ? "dark" : "light"} />
    </div>
  )
}

export default App
