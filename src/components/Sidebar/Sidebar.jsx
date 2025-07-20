import "./Sidebar.css";
import MoogliPlatform from "../../assets/MoogliPlatform.png";
import UserPanel from "./UserPanel.jsx";
import StackMenu from "./StackMenu.jsx";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logoAndPanelControl">
        <img className="sidebarLogo" src={MoogliPlatform}></img>
        <span className="panelControl material-symbols-outlined material-symbols-icon">
          left_panel_close
        </span>
      </div>
      <StackMenu />
      <UserPanel />
    </div>
  );
};
export default Sidebar;
