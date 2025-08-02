import "./EditSidebar.css";
import { useContext, useState, memo } from "react";
import EquipmentDetailsEdit from "./EquipmentDetailsEdit.jsx";
import EquipmentReviewsEdit from "./EquipmentReviewsEdit.jsx";
import { EquipmentContext } from "../context/EquipmentContext";

const TAB_ITEMS = Object.freeze({
  DETAILS: "details",
  REVIEWS: "reviews",
});

const EditSidebar = ({ uuid, closeEditSidebar, handleModal }) => {
  const [selectedTab, setSelectedTab] = useState(TAB_ITEMS.DETAILS);
  const { equipmentData } = useContext(EquipmentContext);
  const equipment = equipmentData.find((equipment) => equipment.uuid === uuid);

  return (
    <div className="sidebarBackdrop" onClick={closeEditSidebar}>
      <div className="sidebarContent" onClick={(e) => e.stopPropagation()}>
        <div className="sidebarHeader">
          {equipment.name}
          <button className="sidebarCloseButton" onClick={closeEditSidebar}>
            &times;
          </button>
        </div>
        <div className="sidebarTabContainer">
          <div
            className={`sidebarTab ${
              selectedTab === TAB_ITEMS.DETAILS && "sidebarTabSelected"
            }`}
            onClick={() => setSelectedTab(TAB_ITEMS.DETAILS)}
          >
            Details
          </div>
          <div
            className={`sidebarTab ${
              selectedTab === TAB_ITEMS.REVIEWS && "sidebarTabSelected"
            }`}
            onClick={() => setSelectedTab(TAB_ITEMS.REVIEWS)}
          >
            Periodic Reviews
          </div>
        </div>
        {selectedTab === TAB_ITEMS.DETAILS && (
          <EquipmentDetailsEdit
            uuid={uuid}
            closeEditSidebar={closeEditSidebar}
          />
        )}
        {selectedTab === TAB_ITEMS.REVIEWS && (
          <EquipmentReviewsEdit uuid={uuid} handleModal={handleModal} />
        )}
      </div>
    </div>
  );
};

export default memo(EditSidebar);
