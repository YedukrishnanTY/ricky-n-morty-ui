import "./App.css";
import Footer from "./components/Footer/Footer";
import { AuthContextProvider } from "./contexts/loginContext";
import MainPage from "./components/Main Page/MainPage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <MainPage />
      </AuthContextProvider>
      <Footer />
    </>
  );
}

export default App;
