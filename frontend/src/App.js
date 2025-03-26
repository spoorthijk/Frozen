import "./App.css";
import { DesertProvider } from "./assets/data/desert";
import Layout from "./Components/Layout/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <DesertProvider>
      <Layout/>
      <ToastContainer
        // This positions the container at the center of the screen
        position="top-center"
        style={{
          textAlign: 'center'
        }}
      />
    </DesertProvider>
  )
}

export default App;
