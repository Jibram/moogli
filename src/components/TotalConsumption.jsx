import "./TotalConsumption.css";

const TotalConsumption = () => {
  return (
    <div className="consumptionContainer">
      <div id="CO2" className="totalContainer">
        <div className="label">Total tCO2e</div>
        <div className="quantity">-</div>
        <div className="unitLabel">tCO2e</div>
      </div>
      <div id="fugitiveRefrigerant" className="totalContainer">
        <div className="label">Total amount of Fugitive Refrigerant</div>
        <div className="quantity">-</div>
        <div className="unitLabel">liters</div>
      </div>
    </div>
  );
};

export default TotalConsumption;
