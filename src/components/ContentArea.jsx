import "./ContentArea.css";
import TotalConsumption from "./TotalConsumption.jsx";
import EquipmentTable from "./EquipmentTable.jsx";

const ContentArea = () => {
  return (
    <div className="contentArea">
      <div className="contentNav">
        <div className="breadcrumbs">
          <span>Overview</span>
          <span>{` < `}</span>
          <span className="currentNavTitle">Fugitive Emissions</span>
        </div>
        <div className="title">
          <span class="material-symbols-outlined">arrow_left_alt</span>
          Fugitive Emissions
        </div>
        <div className="subTitle">
          Fugitive emissions represent a significant proportion of anthropogenic
          greenhouse gas emissions and their assessment, let alone reduction, is
          still in its infancy.
        </div>
      </div>
      <TotalConsumption />
      <EquipmentTable />
    </div>
  );
};

export default ContentArea;
