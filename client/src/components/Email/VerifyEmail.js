import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./verifyEmail.css";
import expiredLogo from "../../asset/images/expired.png";
import verifiedLogo from "../../asset/images/verified.png";
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

const cypherKey = process.env.REACT_APP_CYPHER_KEY;

const VerifyEmail = () => {
  let { userId } = useParams();
  const [verifyData, setVerifyData] = useState({});

  const decryptId = (str) => {
    const decodedStr = decodeURIComponent(str);
    return AES.decrypt(decodedStr, cypherKey).toString(enc.Utf8);
  }
  const uId=decryptId(userId);
console.log(uId)
  const verifyUser = async (id) => {
   // const url=`http://localhost:4000/user/verify/${id}`;//nest
   const url=`http://localhost:5001/api/verify/${id}`;//express
    await axios
      .get(url)
      .then((result) => {
          setVerifyData(result.data)
      })
      .catch((error) => {
        console.log("err", error.message);
      });
  };

  useEffect(() => {
    verifyUser(uId);
  }, [uId]);

  return (
    <div className="verifyBody">
      <div className="verifyCard">
        {verifyData.user ? (
          <>
            <img className="verifyImg" src={verifiedLogo} alt="" />
            <div className="verifyTxt">
              <h3>Hi, {verifyData.user.userName}</h3>
              <p>{verifyData.message}</p>
            </div>
          </>
        ) : (
          <>
            <img className="verifyImg" src={expiredLogo} alt="" />
            <div className="verifyTxt">
              <h3>OPPS...!</h3>
              <p>{verifyData.message}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
