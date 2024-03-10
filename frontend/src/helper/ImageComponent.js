import React, { useState } from "react";

const ImageComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShowDialog = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <img
        style={{ cursor: "pointer" }}
        src={props.img}
        onClick={handleShowDialog}
        alt={props.title}
      />
      {isOpen && (
        <div className="modal" onClick={handleShowDialog}>
          <img
            className="modal-image"
            src={props.img}
            onClick={(e) => e.stopPropagation()}
            alt={props.title}
          />
        </div>
      )}
    </>
  );
};

export default ImageComponent;
