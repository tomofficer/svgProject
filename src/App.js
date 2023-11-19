import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <ChakraProvider>
      <div className='app-fade-in'>
        <Header />
        <Home />
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
