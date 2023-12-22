import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataList from "./pages/DataListPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataList />} />
      </Routes>
    </Router>
  );
};

export default App;
