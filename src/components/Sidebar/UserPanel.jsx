import "./UserPanel.css";
const UserPanel = () => {
  return (
    <div className="userPanel">
      <div className="userInitialsCircle">
        <span>JD</span>
      </div>
      <div className="userDetails">
        <div className="userFullname">John Doe</div>
        <div className="userEmail">john.doe@moogli.io</div>
      </div>
    </div>
  );
};

export default UserPanel;
