import React, { useState } from "react";

export function NewUserModal({
  closeModal,
  handleSave,
  handleChange,
  formData,
  isNewUserModalOpen,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalFromModal = () => {
    setIsModalOpen(false);
    closeModal();
  };

  const handleSaveAndClose = () => {
    handleSave();
    closeModalFromModal();
  };

  return (
    isNewUserModalOpen && (
      <div className="custom-modal">
        <div className="custom-modal-content">
          <span className="custom-close" onClick={closeModalFromModal}>
            &times;
          </span>
          <div className="custom-modal-user-info">
            <h2>Add new user</h2>
            <div className="form-group">
              <label htmlFor="firstName">Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="save-user" onClick={handleSaveAndClose}>
              Save and invite
            </button>
          </div>
        </div>
      </div>
    )
  );
}
