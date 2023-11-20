import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Landing from './Landing';
import AltHome from './AltHome';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className='app-fade-in'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/alt-ui' element={<AltHome />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
