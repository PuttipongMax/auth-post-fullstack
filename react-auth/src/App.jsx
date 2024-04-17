import { useAuth } from "./contexts/authentication";
import Authenticated from "./routers/Authenticated";
import Unauthenticated from "./routers/Unauthenticated";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <Authenticated /> : <Unauthenticated />; 
}

export default App;
