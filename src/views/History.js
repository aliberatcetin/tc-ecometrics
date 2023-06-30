import React, { useEffect, useState } from "react";
import {
  CAvatar, CButton,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr, cifEs,
  cifFr,
  cifIn, cifPl,
  cifUs, cilArrowRight, cilAvTimer, cilHistory,
  cilPeople
} from "@coreui/icons";
import avatar1 from "../assets/images/avatars/1.jpg";
import avatar2 from "../assets/images/avatars/2.jpg";
import avatar3 from "../assets/images/avatars/3.jpg";
import avatar4 from "../assets/images/avatars/4.jpg";
import avatar5 from "../assets/images/avatars/5.jpg";
import avatar6 from "../assets/images/avatars/6.jpg";
import services from "../services";
import { useNavigate } from "react-router-dom";

function History(props) {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const result = await services.apiService.fetchHistories();
      setHistory(result);
    }

    fetch();
  }, []);
  const colors = ["#41B883", "#E46651", "#1b4cb7"
    , "#F26C4F", "#3A8B7D", "#D92B7E", "#6CA9E3", "#FFA84D", "#7248C8", "#58C05C", "#D34175", "#239B94", "#F1A641", "#5E47AA", "#A4C547", "#E64E31", "#3975D0", "#BC913E", "#4FA0D3", "#C23E68", "#1E8D7B", "#F57633", "#6E5AC9"];


  const history2 = [
    {
      avatar: { src: avatar1, status: "success" },
      user: {
        name: "Yiorgos Avraamu",
        new: true,
        registered: "Jan 1, 2021"
      },
      country: { name: "USA", flag: cifUs },
      usage: {
        value: 50,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "success"
      },
      payment: { name: "Mastercard", icon: cibCcMastercard },
      activity: "10 sec ago"
    },
    {
      avatar: { src: avatar2, status: "danger" },
      user: {
        name: "Avram Tarasios",
        new: false,
        registered: "Jan 1, 2021"
      },
      country: { name: "Brazil", flag: cifBr },
      usage: {
        value: 22,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "info"
      },
      payment: { name: "Visa", icon: cibCcVisa },
      activity: "5 minutes ago"
    },
    {
      avatar: { src: avatar3, status: "warning" },
      user: { name: "Quintin Ed", new: true, registered: "Jan 1, 2021" },
      country: { name: "India", flag: cifIn },
      usage: {
        value: 74,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "warning"
      },
      payment: { name: "Stripe", icon: cibCcStripe },
      activity: "1 hour ago"
    },
    {
      avatar: { src: avatar4, status: "secondary" },
      user: { name: "Enéas Kwadwo", new: true, registered: "Jan 1, 2021" },
      country: { name: "France", flag: cifFr },
      usage: {
        value: 98,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "danger"
      },
      payment: { name: "PayPal", icon: cibCcPaypal },
      activity: "Last month"
    },
    {
      avatar: { src: avatar5, status: "success" },
      user: {
        name: "Agapetus Tadeáš",
        new: true,
        registered: "Jan 1, 2021"
      },
      country: { name: "Spain", flag: cifEs },
      usage: {
        value: 22,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "primary"
      },
      payment: { name: "Google Wallet", icon: cibCcApplePay },
      activity: "Last week"
    },
    {
      avatar: { src: avatar6, status: "danger" },
      user: {
        name: "Friderik Dávid",
        new: true,
        registered: "Jan 1, 2021"
      },
      country: { name: "Poland", flag: cifPl },
      usage: {
        value: 43,
        period: "Jun 11, 2021 - Jul 10, 2021",
        color: "success"
      },
      payment: { name: "Amex", icon: cibCcAmex },
      activity: "Last week"
    }
  ];


  return (
    <CTable align="middle" className="mb-0 border" style={{width:900}} hover responsive>
      <CTableHead color="light">
        <CTableRow>


          <CTableHeaderCell>Score</CTableHeaderCell>

          <CTableHeaderCell>Date</CTableHeaderCell>

          <CTableHeaderCell></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {history.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>


            <CTableDataCell>
              <div className="clearfix">
                <div className="float-start">
                  <strong>{item.circularity_visitors.mobility_circularity_score * 100}%</strong>
                </div>
              </div>
              <CProgress thin color={colors.sort(() => .5 - Math.random()).slice(0, 1)}
                         value={item.circularity_visitors.mobility_circularity_score * 100} />
            </CTableDataCell>
            <CTableDataCell >
              <div className="clearfix">
                <div className="float-start">
                  <strong>{item.timestamp ? item.timestamp : "Thursday, 27 Apr 2017 17:41:46 PM"}</strong>
                </div>
              </div>
            </CTableDataCell>

            <CTableDataCell>
              <div className="small text-medium-emphasis">

                <CButton
                  color={"success"}
                  onClick={() => navigate(`/results/${item.calculation_id}`)}
                >
                  <CIcon icon={cilArrowRight} />
                </CButton>

              </div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
}

export default History;
