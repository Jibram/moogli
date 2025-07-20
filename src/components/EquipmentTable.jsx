import "./EquipmentTable.css";

const EquipmentTable = () => {
  return (
    <div className="equipmentTable">
      <div className="tableHead">
        {/* TODO: Replace with anchor link to actual target */}
        <a href="https://en.wikipedia.org/wiki/Fugitive_emission">Learn More</a>
        {/* TODO: Replace + with Add icon in button */}
        <button className="addEquipment">+ Add Equipment</button>
      </div>
      <div>{/* TODO: Rest of the table */}</div>
    </div>
  );
};

export default EquipmentTable;
