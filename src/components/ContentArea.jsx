import "./ContentArea.css";
import { useState, useMemo, useCallback, useContext } from "react";
import { EquipmentContext } from "../context/EquipmentContext";
import TotalConsumption from "./TotalConsumption.jsx";
import EquipmentTable from "./EquipmentTable.jsx";
import EditSidebar from "./EditSidebar.jsx";
import PeriodicReviewModal from "./PeriodicReviewModal.jsx";

const ContentArea = () => {
  // Read-only component
  const { equipmentData } = useContext(EquipmentContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemIndex, setModalItemIndex] = useState(-1);

  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(-1);

  const formatEquipmentData = useMemo(() => {
    const formattedData = {};
    equipmentData.forEach((equipment) => {
      if (!formattedData[equipment.category]) {
        formattedData[equipment.category] = [];
      }
      formattedData[equipment.category].push(equipment);
    });

    return formattedData;
  }, [equipmentData]);

  // Set uuid to -1 to hide Modal
  const handleModal = useCallback((uuid) => {
    setModalItemIndex(uuid);
    setIsModalOpen(uuid > -1);
  }, []);

  // Set uuid to -1 to hide Modal
  const handleEditSidebar = useCallback((uuid) => {
    setEditItemIndex(uuid);
    setIsEditSidebarOpen(uuid > -1);
  }, []);

  return (
    <>
      <div className="contentArea">
        <div className="contentNav">
          <div className="breadcrumbs">
            <span>Overview</span>
            <span>{` < `}</span>
            <span className="currentNavTitle">Fugitive Emissions</span>
          </div>
          <div className="title">
            <span className="material-symbols-outlined">arrow_left_alt</span>
            Fugitive Emissions
          </div>
          <div className="subTitle">
            Fugitive emissions represent a significant proportion of
            anthropogenic greenhouse gas emissions and their assessment, let
            alone reduction, is still in its infancy.
          </div>
        </div>
        <TotalConsumption />
        <EquipmentTable
          data={formatEquipmentData}
          handleModal={handleModal}
          handleEditSidebar={handleEditSidebar}
        />
      </div>
      {isModalOpen && (
        <PeriodicReviewModal
          uuid={modalItemIndex}
          closeModal={() => handleModal(-1)}
        />
      )}
      {isEditSidebarOpen && (
        <EditSidebar
          uuid={editItemIndex}
          handleModal={handleModal}
          closeEditSidebar={() => handleEditSidebar(-1)}
        />
      )}
    </>
  );
};

export default ContentArea;
