import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataList from "./pages/DataListPage";
import NotFound from "./components/not-found/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
