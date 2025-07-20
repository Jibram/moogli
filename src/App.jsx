import "./App.css";
import ContentArea from "./components/ContentArea.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <ContentArea />
    </div>
  );
};

export default App;
