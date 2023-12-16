import React from "react";

export function Modal({ isOpen, closeModal, selectedUser }) {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="modal-user-info">
            <div className="img-block">
              <img src={selectedUser.image} alt="user" />
            </div>

            <div className="text-block">
              <h2>
                {selectedUser.firstName} {selectedUser.lastName}
              </h2>
              <p>Email: {selectedUser.email}</p>
            </div>
          </div>
          <div className="modal-settings">
            <h2>Notifications</h2>
            <h3>General</h3>
            <div className="switch-block">
              <p>Messages</p> <img src="/img/on.png" alt="switch" />{" "}
            </div>
            <div className="switch-block">
              <p>Calls</p> <img src="/img/on.png" alt="switch" />{" "}
            </div>
            <div className="switch-block">
              <p>Activity update</p> <img src="/img/off.png" alt="switch" />{" "}
            </div>
            <div className="switch-block">
              <p>Reviews</p> <img src="/img/off.png" alt="switch" />{" "}
            </div>
            <div className="switch-block">
              <p>Posts</p> <img src="/img/on.png" alt="switch" />{" "}
            </div>
            <div className="switch-block">
              <p>Sees my profile photo</p>{" "}
              <img src="/img/on.png" alt="switch" />{" "}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
