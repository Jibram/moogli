import "./ContentArea.css";
import { useState, useMemo, useCallback, useContext } from "react";
import { EquipmentContext } from "../context/EquipmentContext";
import TotalConsumption from "./TotalConsumption.jsx";
import EquipmentTable from "./EquipmentTable.jsx";
import EditSidebar from "./EditSidebar.jsx";
import PeriodicReviewModal from "./PeriodicReviewModal.jsx";
import PeriodicReviewInfoModal from "./InfoModal.jsx";

const ContentArea = () => {
  // Read-only component
  const { equipmentData } = useContext(EquipmentContext);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [modalItemIndex, setModalItemIndex] = useState(-1);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

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
  const handleReviewModal = useCallback((uuid) => {
    setModalItemIndex(uuid);
    setIsReviewModalOpen(uuid > -1);
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
          handleReviewModal={handleReviewModal}
          handleEditSidebar={handleEditSidebar}
        />
      </div>
      {isReviewModalOpen && (
        <PeriodicReviewModal
          uuid={modalItemIndex}
          closeModal={() => handleReviewModal(-1)}
          openInfoModal={() => setIsInfoModalOpen(true)}
        />
      )}
      {isInfoModalOpen && (
        <PeriodicReviewInfoModal closeModal={() => setIsInfoModalOpen(false)} />
      )}
      {isEditSidebarOpen && (
        <EditSidebar
          uuid={editItemIndex}
          handleReviewModal={handleReviewModal}
          closeEditSidebar={() => handleEditSidebar(-1)}
          openInfoModal={() => setIsInfoModalOpen(true)}
        />
      )}
    </>
  );
};

export default ContentArea;
