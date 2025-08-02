import "./InfoModal.css";

const InfoModal = ({ closeModal }) => {
  return (
    <div className="infoModalBackdrop" onClick={closeModal}>
      <div className="infoModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="infoModalHeader">
          <span class="material-symbols-outlined filled-icon">info</span>
          Information
          <span
            className="closeInfoModal material-symbols-outlined"
            onClick={closeModal}
          >
            highlight_off
          </span>
        </div>
        <div className="infoModalWhy">
          <div className="infoModalWhyHeader">
            <span class="material-symbols-outlined filled-icon">lightbulb</span>
            {
              "Why providing your Refrigerant-Containing equipment Matters for Your CO2e Emissions"
            }
          </div>
          <div className="infoModalWhyContent">
            {
              "To ensure accurate tracking and reporting of fugitive emissions, it’s crucial to identify all refrigerant-containing equipment used by your company. Each type of equipment uses specific refrigerants with unique emission factors. Refrigerants can leak during equipment operation, maintenance, or disposal, contributing significantly to greenhouse gas (GHG) emissions. By reporting this equipment, we can calculate emissions in alignment with the GHG Protocol guidelines."
            }
          </div>
        </div>
        <div className="infoRestHeader">
          Why are we asking for the Disposal of your equipment during the
          Reporting Year?
        </div>
        <div>
          {
            "Disposing of refrigerant-containing equipment can result in significant emissions if refrigerants are not properly recovered. The IPCC Good Practice Guidelines and the GHG Protocol HFC Tool (Version 1.0) outline disposal leakage rates depending on equipment type. This data ensures accurate reporting of emissions associated with equipment disposal."
          }
        </div>
        <div>{"What to Provide"}</div>
        <div>
          {"1. Identify the equipment disposed of during the reporting year."}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
