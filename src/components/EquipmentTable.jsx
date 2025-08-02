import "./EquipmentTable.css";
import { memo } from "react";

const EquipmentTable = ({ data, handleModal, handleEditSidebar }) => {
  const tableColumns = [
    "Equipment Name",
    "Refrigerant type",
    "GWP factor",
    "Capacity in kg",
    "Refrigerant recharged (kg)",
    "Emissions in kgCO2e",
    "Location",
    "Status",
    "",
  ];

  return (
    <div className="equipmentTableContainer">
      <div className="tablePreHead">
        {/* TODO: Replace with anchor link to actual target */}
        <div className="learnMore">Learn More</div>
        <span className="material-symbols-outlined info">info</span>
        <button className="addEquipment">+ Add Equipment</button>
      </div>
      <div className="equipmentTable">
        <div className="grid-table-row tableHead">
          {tableColumns.map((column) => {
            return (
              <div key={column} className="columnLabel">
                <div>{column}</div>
                {column ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="columnSetting"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 18a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>

        <div className="tableContents">
          {Object.keys(data).length > 0 &&
            Object.keys(data)
              .sort()
              .map((category, categoryIndex) => (
                <div key={categoryIndex} className="categoryRowContainer">
                  {/* Category Row */}
                  <div className="categoryRow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="categoryArrowIcon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                    {category}
                  </div>
                  {/* Equipment Items */}
                  {data[category].map((item) => (
                    <div key={item.uuid} className="grid-table-row rowOfData">
                      <div className="equipmentName">
                        <span>{item.name}</span>
                      </div>
                      <div className="columnData">{item.refrigerantType}</div>
                      <div className="columnData">{item.gwpFactor}</div>
                      <div className="columnData">{item.capacity} kg</div>
                      <div className="columnData">
                        {item.refrigerantRecharged} kg
                      </div>
                      <div className="columnData">{item.emissions}</div>
                      <div className="columnData locationContainer">
                        <div className="locationName">{item.location}</div>
                        <div className="locationDescriptor">
                          {item.locationDescriptor}
                        </div>
                      </div>
                      <div className="columnData statusContainer">
                        <div className="status">{item.status}</div>
                        <div className="statusTimeline">
                          {item.statusTimeline}
                        </div>
                      </div>
                      <div className="actions">
                        <button
                          className="editDataButton"
                          onClick={() => {
                            handleEditSidebar(item.uuid);
                          }}
                        >
                          Edit data
                        </button>
                        <button
                          className="addDataButton"
                          onClick={() => {
                            handleModal(item.uuid);
                          }}
                        >
                          Add data
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default memo(EquipmentTable);
