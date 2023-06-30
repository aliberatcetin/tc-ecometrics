import React, { useState } from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel } from "@coreui/react";
import services from "../services";
import { CirclesWithBar } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    backgroundColor: "transparent",
    left: "50%",
    right: "auto",
    border: "0px solid black",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("body");
const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const uploadFile = () => {
    openModal();

    services.apiService.uploadCsv(file)
      .then(res => {
        console.log(res);
        navigate(`/results/${res.calculation_id}`);
        closeModal();
      }).catch(error => {
      closeModal();
      console.log(error);
    });
  };

  console.log(file);


  return <div>


    <CCol xs={12}>


      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CirclesWithBar
          refs={(_subtitle) => (subtitle = _subtitle)}
          height="200"
          width="200"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </Modal>


      <CCard className="mb-4">
        <CCardHeader>
          <strong>Upload Your CSVs</strong> <small> File input</small>
        </CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <CFormLabel htmlFor="formFile"></CFormLabel>
            <CFormInput onChange={event => setFile(event.target.files[0])} type="file" id="formFile" />
          </div>
        </CCardBody>
        <CButton
          color={"success"}
          onClick={() => uploadFile()}
        >Send
        </CButton>
      </CCard>
    </CCol>


  </div>;
};

export default Home;
