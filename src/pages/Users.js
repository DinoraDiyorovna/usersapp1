import React, { useState, useEffect } from "react";
export function Users(
    
) {
  const [users, setUsers] = useState([]);
  const [isUsersListVisible, setIsUsersListVisible] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const ToBox = () => {
    setIsUsersListVisible(false);
  };

  const Toline = () => {
    setIsUsersListVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users`);

        if (!response.ok) {
          throw new Error("Ошибка при получении данных о пользователях");
        }

        const result = await response.json();
        setUsers(result.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log("Открыто", user);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setIsNewUserModalOpen(false);
    console.log("Закрыто");
  };

  const openNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании пользователя");
      }

      const newUser = await response.json();

      setUsers((prevUsers) => [...prevUsers, newUser]);

    
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });

     
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container1">
      <nav>
        <div className="search-block">
          <img src="/img/search.png" alt="search" />
        </div>
        <div className="notification-block">
          <img src="/img/notification.png" alt="notification" />
        </div>
      </nav>
      <div className="block">
        <h3>Users</h3>
        <div className="mini-search-block">
          <img className="mini-search" src="/img/mini-search.png" alt="" />
          <div className="mini-btns">
            <img
              className="box-img"
              src="/img/box.png"
              alt="box"
              onClick={ToBox}
            />
            <img
              className="line-img"
              src="/img/line.png"
              alt="line"
              onClick={Toline}
            />
          </div>
          <button className="new-user" onClick={openNewUserModal}>
            Add new user
          </button>
        </div>
      </div>

      <div
        className="users-list"
        style={{ display: isUsersListVisible ? "block" : "none" }}
      >
        {users.map((user) => (
          <div
            className="user-block"
            key={user.id}
            onClick={() => openModal(user)}
          >
            <div className="user-mini-block">
              <div className="user-img">
                <img src={user.image} alt="" />
              </div>
              <div className="user-info">
                <h4>
                  {" "}
                  {user.firstName} {user.lastName}{" "}
                </h4>
                <p> {user.email}</p>
              </div>
            </div>
            <button>Messages</button>
          </div>
        ))}
      </div>

      <div
        className="users-list1"
        style={{ display: isUsersListVisible ? "none" : "grid" }}
      >
        {users.map((user) => (
          <div
            className="user-block1"
            key={user.id}
            onClick={() => openModal(user)}
          >
            <div className="user-mini-block1">
              <div className="user-img1">
                <img src={user.image} alt="" />
              </div>
              <div className="user-info1">
                <h4>
                  {user.firstName} {user.lastName}{" "}
                </h4>
                <p> {user.email}</p>
              </div>
            </div>
            <button>Messages</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
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
                {" "}
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
      )}
      {isNewUserModalOpen && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <span className=" custom-close" onClick={closeModal}>
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
                <label htmlFor="lastName"> name</label>
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
              <button className="save-user" onClick={handleSave}>
                Save and invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
