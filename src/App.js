import './App.css'; 
import Weather from './Weather/Weather';
function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 p-0">
        <div className="flex-1">
          <Weather />
        </div>
      </div>
      <footer className="bg-gray-100 text-center py-4 text-gray-500 mt-auto"> {/* changed mt-4 to mt-auto*/}
        <p>© {new Date().getFullYear()} Weather App. All rights reserved.</p>
        <a href="https://github.com/ken-lyk/weather-app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;