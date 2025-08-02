import "./EquipmentDetailsEdit.css";
import { useState, useContext } from "react";
import { EquipmentContext } from "../context/EquipmentContext";

const DETAILS_CONFIG = [
  [
    {
      title: "Name of the Equipment",
      key: "name",
      type: "input",
      options: [],
      conditionalOptions: {},
    },
    {
      title: "Type of Equipment",
      key: "category",
      type: "select",
      options: [
        "Air-Conditioning",
        "Beverage dispenser",
        "Blast-chillers",
        "Chillers",
        "Freezers",
        "Heat-pump",
        "Ice cream machines",
        "Ice makers",
        "Refrigerators",
        "Refrigerated Display Case",
        "Refrigerated Transport",
        "Vending machines",
      ],
      conditionalOptions: {},
    },
    {
      title: "Located at",
      key: "location",
      type: "select",
      options: [
        "Moogli Holdings",
        "Moogli Valencia",
        "Moogli Madrid",
        "Moogli Amsterdam",
        "Moogli Chile",
      ],
      conditionalOptions: {},
    },
  ],
  [
    {
      title: "Use of Equipment",
      key: "useOfEquipment",
      type: "select",
      options: [],
      conditionalOptions: {
        "air-conditioning": [
          "Cooling a single room or small space",
          "Cooling of single or multiple rooms (often used in homes and offices)",
          "Cooling medium-sized commercial spaces (commercial buildings, retail spaces)",
          "Cooling larger commercial and industrial spaces (large retail stores, industrial facilities, larger commercial buildings)",
          "Customised for specific industrial processes (Industrial applications, manufacturing, heavy industry)",
        ],
        "beverage dispenser": [
          "Countertop soda dispenser",
          "Self serve beverage dispenser",
          "Milk dispenser",
          "Hot beverage dispenser",
          "Undercounter beverage dispenser",
          "Frozen beverage dispenser",
          "Large Beverage Dispensing system (Large restaurants, theatres, stadiums, entertainment venues)",
        ],
        "blast-chillers": [
          "Reach- in blast chillers",
          "Trolley Blast chillers",
          "Combination Blast Chiller, Freezer",
          "Roll-in Blast chillers",
          "Industrial Blast chillers",
        ],
        chillers: [
          "Reciprocating Chillers",
          "Air-cooled chillers",
          "Absorption chillers",
          "Scroll Chillers",
          "Screw - Chillers",
          "Centrifugal Chillers (mostly used in large industrial settings)",
        ],
        freezers: [
          "Mini-fridges",
          "Dorm fridges",
          "Wine / Beer fridges",
          "Residential freezers",
          "Undercounter freezers",
          "Countertop freezers",
          "Reach-in freezers",
          "Display cases",
          "Walk-in Freezers",
          "Large Reach-in Freezers",
          "Supermarket display freezers",
          "Industrial Blast freezers",
          "Spiral freezers",
          "Industrial cold storage rooms & warehouses",
          "Tunnel freezers",
        ],
        "heat-pump": [
          "Air-source heat pumps (ASHPs)",
          "Ground-source heat pumps (GSHPs)",
          "Air-to-water heat pumps",
          "Water-to-water heat pumps",
        ],
        "ice cream machines": [
          "Soft serve ice cream",
          "Yoghurt machines,",
          "Batch freezer ice cream machines",
          "Gelato machines",
          "Frozen yoghurt machines",
          "Industrial ice cream machines",
        ],
        "ice makers": [
          "Residential ice makers",
          "Undercounter ice makers",
          "Countertop ice makers",
          "Commercial ice cube makers",
          "Tube ice makers",
          "Cube ice makers",
          "Flake ice makers",
          "Nugget ice makers",
        ],
        refrigerators: [
          "Mini-fridges",
          "Dorm fridges",
          "Wine / Beer fridges",
          "Residential refrigerators",
          "Undercounter refrigerators",
          "Countertop refrigerators",
          "Reach-in refrigerators",
          "Display cases",
          "Walk-in refrigerators",
          "Large Reach-in refrigerators",
          "Supermarket display refrigerators",
          "Cold storage warehouses",
        ],
        "refrigerated display case": [
          "Undercounter refrigeration display case",
          "Countertop refrigeration display case",
          "Floor-model refrigeration display case",
        ],
        "refrigerated transport": [
          "Refrigerated van",
          "Refrigerated truck",
          "Refrigerated trailer",
        ],
        "vending machines": [
          "(Under)counter vending machines",
          "Reach-in vending machines",
          "Display case vending machines",
        ],
      },
    },
    {
      title: "Year of Installation",
      key: "installationYear",
      type: "number",
      options: [],
      conditionalOptions: {},
    },
    {
      title: "Refrigerant Type",
      key: "refrigerantType",
      type: "select",
      options: [
        "R600a",
        "HFC-134a",
        "R-32",
        "R290",
        "R11",
        "R404A",
        "R-410A",
        "HFC-125",
      ],
      conditionalOptions: {},
    },
  ],
  [
    {
      title: "Maintenance Cycle",
      key: "maintenanceCycle",
      type: "select",
      options: [
        "No periodic reviews",
        "Every 3 months",
        "Every 6 months",
        "Annually",
        "Every 2 years",
      ],
      conditionalOptions: {},
    },
    {
      title: "Knowledge on Refrigerant Charge",
      key: "refrigerantChargeKnowledge",
      type: "checkbox",
      options: [],
      conditionalOptions: {},
    },
    {
      title: "Refrigerant Default Charge",
      key: "refrigerantDefaultCharge",
      type: "input",
      options: [],
      conditionalOptions: {},
    },
  ],
];

const EquipmentDetailsEdit = ({ uuid, closeEditSidebar }) => {
  const { equipmentData, updateEquipment } = useContext(EquipmentContext);
  const equipment = equipmentData.find((equipment) => equipment.uuid === uuid);

  const [isEditingEquipmentDetails, setIsEditingEquipmentDetails] =
    useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  const [equipmentFormData, setEquipmentFormData] = useState(equipment);
  const [isDisposed, setIsDisposed] = useState(equipment.disposed);

  const getDetailValue = (detailKey) => {
    if (detailKey === "refrigerantChargeKnowledge") {
      return equipment.refrigerantChargeKnowledge ? "Yes" : "No";
    }
    if (detailKey === "useOfEquipment") {
      return equipment.useOfEquipment;
    }
    return equipment[detailKey];
  };

  const handleEquipmentDetailsEdit = () => {
    setIsEditingEquipmentDetails((prevState) => !prevState);
  };

  const handleInfoClick = () => {
    setShowInfoTooltip(!showInfoTooltip);
    console.log("Info icon clicked!");
  };

  const handleDisposedToggle = () => {
    const newDisposedState = !isDisposed;
    setIsDisposed(newDisposedState);
    updateEquipment(uuid, { disposed: newDisposedState });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEquipmentFormData((prevEquipmentFormData) => ({
      ...prevEquipmentFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const deleteEquipment = () => {
    closeEditSidebar();
    updateEquipment(uuid, null);
  };

  const handleSubmit = () => {
    updateEquipment(uuid, equipmentFormData);
    setIsEditingEquipmentDetails(false);
  };

  return (
    <div className="equipmentDetailsContainer">
      <div className="equipmentDetails">
        <div className="equipmentDetailsHeader">
          <span className="material-symbols-outlined">climate_mini_split</span>
          {equipment.name}
          <button
            className="equipmentDetailsEditButton"
            onClick={handleEquipmentDetailsEdit}
            aria-label="Edit Details"
          >
            <span className="material-symbols-outlined">border_color</span>
          </button>
        </div>
        {isEditingEquipmentDetails ? (
          <>
            {DETAILS_CONFIG.map((rowItems, rowIndex) => (
              <div
                className={`${
                  rowIndex != 2
                    ? "equipmentDetailsRow"
                    : "equipmentDetailsColumn"
                }`}
                key={rowIndex}
              >
                {rowItems.map((item, itemIndex) => {
                  let optionsToRender = [];
                  if (item.options.length > 0) {
                    optionsToRender = item.options;
                  } else if (
                    item.conditionalOptions &&
                    equipmentFormData.category
                  ) {
                    const categoryKey =
                      equipmentFormData.category.toLowerCase();
                    optionsToRender =
                      item.conditionalOptions[categoryKey] || [];
                  }

                  return (
                    <div
                      className={`${
                        rowIndex != 2
                          ? "equipmentDetailsRowItem"
                          : "equipmentDetailsColumnItem"
                      }`}
                      key={itemIndex}
                    >
                      <div className="equipmentDetailTitle">{item.title}</div>
                      {item.type === "input" && (
                        <input
                          className="equipmentDetailInput"
                          type="text"
                          name={item.key}
                          value={equipmentFormData[item.key] || ""}
                          onChange={handleChange}
                        />
                      )}
                      {item.type === "number" && (
                        <input
                          className="equipmentDetailInput"
                          type="number"
                          name={item.key}
                          value={equipmentFormData[item.key] || ""}
                          onChange={handleChange}
                        />
                      )}
                      {item.type === "select" && (
                        <select
                          className="equipmentDetailInput"
                          name={item.key}
                          value={equipmentFormData[item.key] || ""}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>
                          {optionsToRender.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {item.type === "checkbox" && (
                        <label className="equipmentKRCSwitch">
                          <input
                            className="equipmentKRCToggle"
                            type="checkbox"
                            name={item.key}
                            checked={equipmentFormData[item.key]}
                            onChange={handleChange}
                          />
                          <span className="equipmentKRCSlider"></span>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="equipmentDetailsCancelAndSaveContainer">
              <button
                className="equipmentDetailsDeleteButton"
                onClick={deleteEquipment}
              >
                <span className="material-symbols-outlined">delete</span>
                Delete
              </button>
              <button
                className="equipmentDetailsSaveButton"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </>
        ) : (
          // FIXED DATA VIEW - NOT IN EDIT MODE
          DETAILS_CONFIG.map((rowItems, rowIndex) => (
            <div className="equipmentDetailsRow" key={rowIndex}>
              {rowItems.map((item, itemIndex) => (
                <div className="equipmentDetailsRowItem" key={itemIndex}>
                  <div className="equipmentDetailTitle">{item.title}</div>
                  <div className="equipmentDetailValue">
                    {getDetailValue(item.key)}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <div className="equipmentDisposedContainer">
        <div className="equipmentDisposedLabelText">
          Equipment Disposed
          <span
            className="material-symbols-outlined info"
            onClick={handleInfoClick}
          >
            info
          </span>
        </div>
        <label className="equipmentDisposedSwitch">
          <input
            type="checkbox"
            id="disposed-switch"
            className="equipmentDisposedToggle"
            checked={isDisposed}
            onChange={handleDisposedToggle}
          />
          <span className="equipmentDisposedSlider"></span>
        </label>
      </div>
    </div>
  );
};

export default EquipmentDetailsEdit;
