import React, { useState } from "react";
import "./CreateUser.css";
import userPageLogo from "../../asset/images/user.png";
import axios from "axios";

const CreateUser = () => {
  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
    expireAt: "",
  });
  const [successData, setSuccessData] = useState({});

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const isNonEmpty = !Object.values(inputData).some(
      (x) => x === null || x === ""
    );
    if (isNonEmpty) {
      const createUser = async () => {
        const url=`http://localhost:5001/api/user`//express
      // const url=`http://localhost:4000/user/createUser`//nest
        await axios
          .post(url, inputData)
          .then((result) => {
            setSuccessData(result.data);
            document.getElementById("userForm").reset();
          })
          .catch((error) => {
            console.log("err", error.message);
          });
        setInputData({
            userName: "",
            email: "",
            expireAt: "",
        })
      };
      createUser();
    } else {
      console.log("empty field");
    }

  };
  return (
    <div className="createUserBody">
      <div className="createUserLeft">
        <img className="createUserImg" src={userPageLogo} alt="" />
      </div>
      <div className="createUserRight">
        <div className="rightContent">
          <h3>Create User</h3>
          <form id="userForm" onSubmit={handleCreate}>
            <div className="inputSegment">
              <label className="inputLabel">UserName</label>
              <input
                className="inputField"
                type="text"
                name="userName"
                onChange={handleChange}
              />
            </div>
            <div className="inputSegment">
              <label className="inputLabel">Email</label>
              <input
                className="inputField"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="inputSegment">
              <label className="inputLabel">Expire Time (Minutes)</label>
              <input
                className="inputField"
                type="text"
                name="expireAt"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="saveBtn">
              Save
            </button>
          </form>
          {successData && (
            <p className={successData.user ? "successText" : "failedText"}>
              {successData.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
