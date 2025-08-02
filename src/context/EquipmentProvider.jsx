import { useState, useEffect, useCallback } from "react";
import initialEquipmentData from "../data/dummydataraw.js";
import { EquipmentContext } from "./EquipmentContext.js";

export const EquipmentProvider = ({ children }) => {
  const [equipmentData, setEquipmentData] = useState(initialEquipmentData);

  const updateEquipment = useCallback((uuid, updatedProperties) => {
    if (updatedProperties === null) {
      setEquipmentData((prevEquipmentData) =>
        prevEquipmentData.filter((equipment) => equipment.uuid != uuid)
      );
    } else {
      setEquipmentData((prevEquipmentData) =>
        prevEquipmentData.map((equipment) => {
          if (equipment.uuid === uuid) {
            return { ...equipment, ...updatedProperties };
          }
          return equipment;
        })
      );
    }
  }, []);

  const value = { equipmentData, updateEquipment };

  return (
    <EquipmentContext.Provider value={value}>
      {children}
    </EquipmentContext.Provider>
  );
};
