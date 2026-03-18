import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CarDetails } from './pages/CarDetails';
import { Listing } from './pages/Listing';

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-bg text-text font-sans scroll-smooth">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
