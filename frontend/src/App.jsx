import { Container } from 'react-bootstrap';
import { Footer, Header } from './components/index';
import { Home } from './screen';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
