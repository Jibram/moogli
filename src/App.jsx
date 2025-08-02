import "./App.css";
import ContentArea from "./components/ContentArea.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { EquipmentProvider } from "./context/EquipmentProvider.jsx";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <EquipmentProvider>
        <ContentArea />
      </EquipmentProvider>
    </div>
  );
};

export default App;
