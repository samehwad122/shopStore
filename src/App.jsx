import Body from "./components/body";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Body />
    </AuthProvider>
  );
}

export default App;
