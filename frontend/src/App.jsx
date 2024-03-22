import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Footer, Header, Toast } from './components/index';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Toast />
    </>
  );
};

export default App;
