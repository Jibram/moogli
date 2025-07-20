import "./StackMenu.css";

const StackMenu = () => {
  return (
    <div className="stackMenu">
      <div className="myTask">
        <div className="taskTitle">HOME</div>
        <div className="menuItem">X Overview</div>
        <div className="menuItem">X Company</div>
      </div>
      <div className="myTask">
        <div className="taskTitle">MEASURE</div>
        <div className="menuItem selected">
          {`X Scope 1`}
          <div className="subMenuItem">Overview</div>
          <div className="subMenuItem">Stationary Combustion</div>
          <div className="subMenuItem">Mobile Combustion</div>
          <div className="subMenuItem selectedSubMenu">Fugitive Emissions</div>
        </div>
        <div className="menuItem">
          {`X Scope 2`}
          <div className="subMenuItem">Energy</div>
        </div>
        <div className="menuItem locked">{`X Scope 3`}</div>
      </div>
      <div className="myTask">
        <div className="taskTitle">GHG INVENTORY</div>
        <div className="menuItem">X Results</div>
        <div className="menuItem">X Reports</div>
      </div>
      <div className="myTask">
        <div className="taskTitle">REDUCTION PLANS</div>
        <div className="menuItem locked">X Short term</div>
        <div className="menuItem locked">X Long term</div>
        <div className="menuItem locked">X Net Zero</div>
        <div className="menuItem locked">X Mitigation</div>
      </div>
      <div className="myTask">
        <div className="taskTitle">IMPACT</div>
        <div className="menuItem">X Mupi</div>
        <div className="menuItem">X App</div>
      </div>
    </div>
  );
};

export default StackMenu;
