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
    </div>
  );
}

export default App;