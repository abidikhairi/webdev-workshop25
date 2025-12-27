import { Routes, Route } from "react-router-dom";
import Collections from "./components/Collections";
import Todos from "./components/Todos";
import Comments from "./components/Comments";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Collections />} />
        <Route path="/todo/:name" element={<Todos />} />
        <Route path="/todo/:name/:todoIndex" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
