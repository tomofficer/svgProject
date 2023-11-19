import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Home />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
