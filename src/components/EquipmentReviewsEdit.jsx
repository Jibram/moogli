import "./EquipmentReviewsEdit.css";
import { useContext, memo } from "react";
import { EquipmentContext } from "../context/EquipmentContext";

const EquipmentReviewsEdit = ({ uuid, handleReviewModal, openInfoModal }) => {
  const { equipmentData, updateEquipment } = useContext(EquipmentContext);

  const deleteReview = (keyToDelete) => {
    const currentReviews = equipment.reviews || [];
    const updatedReviews = currentReviews.filter(
      (review) => review.key !== keyToDelete
    );
    updateEquipment(uuid, { reviews: updatedReviews });
  };

  // Specific equipment we are adding reviews to
  const equipment = equipmentData.find((equipment) => equipment.uuid === uuid);

  return (
    <div className="equipmentReviewsContainer">
      <div className="equipmentConsumptionContainer">
        <div className="equipmentConsumptionTotal">
          <div className="equipmentConsumptionLabel">
            Total Fugitive Gas in kg
          </div>
          <div className="equipmentConsumptionQuantity">{`- kg`}</div>
        </div>
        <div className="equipmentConsumptionTotal">
          <div className="equipmentConsumptionLabel">
            Total Fugitive Gas in kg
          </div>
          <div className="equipmentConsumptionQuantity">{`- kg`}</div>
        </div>
      </div>
      <div className="equipmentReviews">
        <div className="equipmentReviewsHeader">
          Periodic Reviews
          <span
            className="material-symbols-outlined info"
            onClick={(e) => {
              e.stopPropagation();
              openInfoModal();
            }}
          >
            info
          </span>
        </div>
        <div className="equipmentReviewsGridRow equipmentReviewsTableHeadLabels">
          <div className="equipmentReviewsColumnLabel">Date of review</div>
          <div className="equipmentReviewsColumnLabel">Refrigerant refill</div>
          <div className="equipmentReviewsColumnLabel">Maintenance report</div>
        </div>
        {/* Existing reviews */}
        {equipment.reviews && equipment.reviews.length > 0 ? (
          equipment.reviews.map((review) => {
            const dateObject = new Date(review.date);
            return (
              <div key={review.key} className="equipmentReviewsGridRow">
                <div className="modalTableEntryData">
                  {dateObject.toLocaleDateString()}
                </div>
                <div className="modalTableEntryData">
                  {`${review.refrigerantRefillQuantity} ${
                    review.refrigerantRefillQuantity > 1 ? "liters" : "liter"
                  }`}
                </div>
                <div className="modalTableEntryData fileName">
                  {review.file.name}
                </div>
                <button
                  className="reviewDeleteButton"
                  onClick={() => deleteReview(review.key)}
                >
                  &times;
                </button>
              </div>
            );
          })
        ) : (
          <div className="equipmentReviewsNone">
            <div className="equipmentReviewsIconCircle">
              <span className="material-symbols-outlined">note_add</span>
            </div>
            <div className="equipmentReviewsListEmpty">
              <div className="equipmentReviewsListEmptyTitle">List empty</div>
              <div className="equipmentReviewsListEmptySubtitle">
                Your periodic reviews will show up here
              </div>
            </div>

            <button
              className="equipmentReviewsAddButton"
              onClick={() => handleReviewModal(uuid)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              {`Add Periodic Review`}
            </button>
          </div>
        )}
        {equipment.reviews && equipment.reviews.length > 0 && (
          <div className="addPeriodicReviewContainer">
            <button
              className="addPeriodicReview"
              onClick={() => handleReviewModal(uuid)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              {`Add Periodic Review`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(EquipmentReviewsEdit);
