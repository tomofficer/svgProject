import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import AltLanding from './pages/AltLanding';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className='app-fade-in'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/alt-ui' element={<AltLanding />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
