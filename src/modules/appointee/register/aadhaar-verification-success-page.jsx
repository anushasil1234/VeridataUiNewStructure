import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toRegister } from "shared/constants/constants";
import { hasValue, patternChecking } from "shared/utils";
import { getLocalStorageItem } from "shared/utils";
import { GetDigilockerAadhaarData } from "server/apis/verify/get-digilocker-aadhaar-detail";

const AadhaarSuccess = () => {
  const navigate = useNavigate();
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { openRemarksModel } = functionSlice[0];
  const { userId, appointeeId, userCode, userName,candidateId } = loggedInData[0];
  console.log("loggedInData", loggedInData[0]);

  const generateRemarks = (remarks) => {
    let remarksList = [];
    if (hasValue(remarks)) {
      remarksList = remarks.split(",").map((remark) => {
        return {
          remarksCategory: "NRML",
          remarks: remark,
        };
      });
    }
    return remarksList;
  };



  // const fetchAadhaarData = async () => {
  //   try {
  //     const requestId = getLocalStorageItem("aadhaar_request_id");
  //     console.log("requestId", requestId);
  //     if (!requestId) {
  //       console.error("Missing request_id");
  //       navigate(`/appointeeregister/${candidateId}/aadhaar/failure`);
  //       return;
  //     }

  //     const payload = {
  //       appointeeId,
  //       userId,
  //       requestId,
  //       aadharName: userName,
  //     };

  //     console.log("payload2", payload);

  //     const response = await GetDigilockerAadhaarData(payload);
  //     if (response) {
  //       const { remarks, isVarified } = response.responseInfo;
  //       //setIsPanVarified(isValid);

  //       if (isVarified) {
  //         navigate(toRegister); // Redirect on success
  //       } else {
  //         if (hasValue(remarks)) {
  //           const generatedRemarks = generateRemarks(remarks);
  //           openRemarksModel(generatedRemarks);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Aadhaar details:", error);
  //     navigate(`/appointeeregister/${candidateId}/aadhaar/failure`);
  //     // Delay navigation to `toRegister` by 10 seconds
  //     setTimeout(() => {
  //       navigate(toRegister);
  //     }, 10000); // 10,000 ms = 10 sec
  //   }
  // };

  const fetchAadhaarData = async () => {
    try {
      const requestId = getLocalStorageItem("aadhaar_request_id");
      console.log("requestId", requestId);
      
      if (!requestId) {
        console.error("Missing request_id");
        navigate(`/appointeeregister/${candidateId}/aadhaar/failure`);
        return;
      }
  
      const payload = {
        appointeeId,
        userId,
        requestId,
        aadharName: userName,
      };
  
      console.log("payload2", payload);
  
      const response = await GetDigilockerAadhaarData(payload);
      
      if (response) {
        const { remarks, isVarified } = response.responseInfo;
        
        if (isVarified) {
          navigate(toRegister, { state: { responseInfo: response.responseInfo } }); // Pass responseInfo
        } else {
          navigate(toRegister, { state: { responseInfo: response.responseInfo } }); // Pass responseInfo even if not verified
        }
      }
    } catch (error) {
      console.error("Error fetching Aadhaar details:", error);
      navigate(`/appointeeregister/${candidateId}/aadhaar/failure`);
      
      // Delay navigation to `toRegister` by 10 seconds
      setTimeout(() => {
        navigate(toRegister);
      }, 10000);
    }
  };

  useEffect(() => {
    fetchAadhaarData();
  }, [appointeeId, navigate, userId, userName]);

  return <div>Fetching Aadhaar details...</div>;
};

export default AadhaarSuccess;

