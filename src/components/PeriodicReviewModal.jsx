import "./PeriodicReviewModal.css";
import { useContext, useMemo, useState, useRef } from "react";
import { EquipmentContext } from "../context/EquipmentContext";

const PeriodicReviewModal = ({ uuid, closeModal, openInfoModal }) => {
  const { equipmentData, updateEquipment } = useContext(EquipmentContext);

  // Specific equipment we are adding reviews to

  const equipment = useMemo(() => {
    return equipmentData.find((equipment) => equipment.uuid === uuid);
  }, [equipmentData, uuid]);

  // Review form data fields, saved only when submitted.
  const [newReviews, setNewReviews] = useState([]);
  const [date, setDate] = useState("");
  const [refrigerantRefillQuantity, setRefrigerantRefillQuantity] = useState(0);
  const [file, setFile] = useState(null);

  // Render helper states and refs
  const [isOpenForm, setIsOpenForm] = useState(false);
  const dateRef = useRef(null);
  const uploadRef = useRef(null);

  // DATA PICKER FUNCTIONS
  const openDatePicker = () => {
    if (dateRef.current) {
      dateRef.current.showPicker(); // showPicker() is a method on HTMLInputElement for date/time inputs
    }
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // REFILL QUANTITY FUNCTIONS
  const handleIncrement = () => {
    setRefrigerantRefillQuantity((prevNumber) => prevNumber + 1);
  };

  const handleDecrement = () => {
    setRefrigerantRefillQuantity((prevNumber) => Math.max(0, prevNumber - 1));
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setRefrigerantRefillQuantity("");
    } else {
      const num = parseInt(value, 10);
      if (!isNaN(num)) {
        setRefrigerantRefillQuantity(num);
      }
    }
  };

  const handleBlur = () => {
    if (refrigerantRefillQuantity === "") {
      setRefrigerantRefillQuantity(0);
    }
  };

  // UPLOAD FILE FUNCTIONS
  const handleUploadFileClick = () => {
    uploadRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  // UPDATE COMPONENT STATE FUNCTIONS
  const appendReview = () => {
    setNewReviews((prevState) => [
      ...prevState,
      {
        key: Date.now(), // Generate a unique key
        date: date,
        refrigerantRefillQuantity: refrigerantRefillQuantity,
        file: file,
      },
    ]);
    clearForm();
  };

  const deleteReview = (keyToDelete) => {
    // Check if the review to delete is a new, unsaved review
    const isNewReview = newReviews.some((review) => review.key === keyToDelete);

    if (isNewReview) {
      setNewReviews((prevNewReviews) =>
        prevNewReviews.filter((review) => review.key !== keyToDelete)
      );
    } else {
      // If it's an existing review, update the equipment context
      const updatedReviews = equipment.reviews.filter(
        (review) => review.key !== keyToDelete
      );
      updateEquipment(uuid, { reviews: updatedReviews });
    }
  };

  const clearForm = () => {
    setDate("");
    setRefrigerantRefillQuantity(0);
    setFile(null);
    setIsOpenForm(false);
  };

  const saveReviews = () => {
    const allReviews = [...equipment.reviews, ...newReviews];
    updateEquipment(uuid, { reviews: allReviews });
    clearForm();
    setNewReviews([]);
  };

  return (
    <div className="modalBackdrop" onClick={closeModal}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeaderContainer">
          <div className="modalHeader">
            Add Periodic Reviews
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
          <button className="modalCloseButton" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modalEquipmentReviewsContainer">
          <div className="modalEquipmentName">{equipment.name}</div>
          <div className="modalGridRow modalTableHeadLabels">
            <div className="modalColumnLabel">Date of review</div>
            <div className="modalColumnLabel">Refrigerant refill</div>
            <div className="modalColumnLabel">Maintenance report</div>
            <div className="modalColumnLabel"></div>
          </div>
          {/* Existing reviews */}
          {equipment.reviews &&
            equipment.reviews.map((review) => {
              const dateObject = new Date(review.date);
              return (
                <div key={review.key} className="modalGridRow">
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
            })}
          {/* New and unsaved reviews */}
          {newReviews &&
            newReviews.map((review) => {
              const dateObject = new Date(review.date);
              return (
                <div key={review.key} className="modalGridRow">
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
            })}

          {!isOpenForm ? (
            // Add Periodic Review
            <div className="modalGridRow">
              <div className="modalTableEntryData">
                <button
                  className="addPeriodicReview"
                  onClick={() => setIsOpenForm(true)}
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
            </div>
          ) : (
            // Submit Periodic Review Form
            <div className="modalGridRow">
              <div className="modalTableEntryData">
                <div className="datePickerContainer">
                  <input
                    type="date"
                    ref={dateRef}
                    className="dateInput"
                    value={date}
                    onChange={handleDateChange}
                    placeholder="" // Reverted placeholder text to empty
                    aria-label="Select Date"
                  />
                  <button
                    type="button" // Important: Prevent form submission
                    className="calendarIconButton"
                    onClick={openDatePicker}
                    aria-label="Open date picker"
                  >
                    {/* Calendar Icon SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="modalTableEntryData">
                <div className="numberSelectorContainer">
                  <input
                    type="number"
                    className="numberInput"
                    value={refrigerantRefillQuantity}
                    onChange={handleQuantityChange}
                    onBlur={handleBlur}
                    aria-label="Current number value"
                    min="0" // Set minimum value for input
                  />
                  <div className="buttonGroupVertical">
                    <button
                      className="incrementButton"
                      onClick={handleIncrement}
                      aria-label="Increment number"
                    >
                      &#9650;
                    </button>
                    <button
                      className="decrementButton"
                      onClick={handleDecrement}
                      aria-label="Decrement number"
                    >
                      &#9660;
                    </button>
                  </div>
                </div>
              </div>
              <div className="modalTableEntryData">
                {!file ? (
                  <div className="uploadFileContainer">
                    <button
                      type="button"
                      className="select-file-button"
                      onClick={handleUploadFileClick}
                    >
                      {/* Upload Icon SVG */}
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
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      Select File
                    </button>
                    {/* Hidden native file input */}
                    <input
                      type="file"
                      ref={uploadRef}
                      className="hidden-file-input"
                      onChange={handleFileChange}
                      aria-hidden="true" /* Hide from screen readers */
                      tabIndex="-1" /* Prevent focus via keyboard tabbing */
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      Selected <span className="fileName">{file.name}</span>
                    </div>
                    <button onClick={clearFile}>Resubmit</button>
                  </>
                )}
              </div>
              <div className="modalTableEntryData modalActions">
                <button className="submitButton" onClick={appendReview}>
                  Submit
                </button>
                {/* Replace with Trash Bin button */}
                <button className="deleteButton" onClick={clearForm}>
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="modalCancelAndSave">
          <button className="modalCancelButton" onClick={clearForm}>
            Cancel
          </button>
          <button className="modalSaveButton" onClick={saveReviews}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodicReviewModal;
