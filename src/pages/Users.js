import React, { useState, useEffect } from "react";
import { NewUserModal } from "../components/NewUserModal";
import { Modal } from "../components/Modal";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { fireStore } from "../lib/firebase";

export function Users() {
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
        const querySnapshot = await getDocs(collection(fireStore, "users"));
        const fetchedUsers = [];

        querySnapshot.forEach((doc) => {
          fetchedUsers.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchData();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log("Open", user);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setIsNewUserModalOpen(false);
    console.log("Closed");
  };

  const openNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const deleteUser = async (userId) => {
    try {
      const userRef = doc(fireStore, "users", userId);
      await deleteDoc(userRef);

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);

      closeModal();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(fireStore, "users"), {
        ...formData,
      });

      const userId = docRef.id;

      setUsers((prevUsers) => [
        ...prevUsers,
        {
          id: userId,
          ...formData,
        },
      ]);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });

      closeModal();
    } catch (error) {
      console.error(
        "Ошибка при добавлении нового пользователя:",
        error.message
      );
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
          <input type="text" placeholder="Search" />
        </div>
        <div className="notification-block">
          <img src="./img/notification" alt="notification" />
        </div>
      </nav>
      <div className="block">
        <h3>Users</h3>
        <div className="mini-search-block">
          <input type="text" placeholder="Search" />
          <div className="mini-btns">
            <img
              className="box-img"
              src="./img/box.png"
              alt="box"
              onClick={ToBox}
            />
            <img
              className="line-img"
              src="./img/line.png"
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
          <div className="user-block" key={user.id}>
            <div className="user-mini-block" onClick={() => openModal(user)}>
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
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}{" "}
      </div>

      <div
        className="users-list1"
        style={{ display: isUsersListVisible ? "none" : "grid" }}
      >
        {users.map((user) => (
          <div className="user-block1" key={user.id}>
            <div className="user-mini-block1" onClick={() => openModal(user)}>
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
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        selectedUser={selectedUser}
      />
      <NewUserModal
        isNewUserModalOpen={isNewUserModalOpen}
        closeModal={closeModal}
        handleChange={handleChange}
        handleSave={handleSave}
        formData={formData}
      />
    </div>
  );
}
