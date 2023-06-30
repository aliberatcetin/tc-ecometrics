import React, { useEffect, useState } from "react";
import { cibLogstash } from "@coreui/icons";
import { useLocation } from "react-router-dom";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem, CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow, CTooltip
} from "@coreui/react";
import { CChartDoughnut, CChartRadar } from "@coreui/react-chartjs";
import { useParams } from "react-router";
import services from "../services";
import Recommendation from "./Recommendation";


const Results = (props) => {
  const params = useParams();

  const [state, setState] = useState({ "circularity_suppliers": {}, "circularity_visitors": {} });

  const [toggleRecomm, setToggleRecomm] = useState(false);
  console.log(state);
  useEffect(() => {
    async function fetch() {
      const result = await services.apiService.fetchHistoryById(params.calculation_id);
      setState(result);
    }

    fetch();
  }, []);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const colors = ["#41B883", "#E46651", "#1b4cb7"
    , "#F26C4F", "#3A8B7D", "#D92B7E", "#6CA9E3", "#FFA84D", "#7248C8", "#58C05C", "#D34175", "#239B94", "#F1A641", "#5E47AA", "#A4C547", "#E64E31", "#3975D0", "#BC913E", "#4FA0D3", "#C23E68", "#1E8D7B", "#F57633", "#6E5AC9"];


  //localStorage.setItem('user', JSON.stringify(state.calculation_id));

  const renderSuppliers = () => {
    const {
      total_co2_overall_suppliers,
      co2_per_supplier,
      distribution_of_means_of_transport_suppliers,
      average_distance_per_supplier,
      mobility_circularity_score_suppliers,
      mobility_circularity_overall_score_suppliers
    }
      = state.circularity_suppliers;

    return <div>

      <CCard className="mb-4">
        <CCardHeader>Mobility {" & "} Suppliers</CCardHeader>
        <CCardBody className="metricCard" style={{backgroundColor:"black", color:"white"}}>
          <CRow>
            <CCol sm={4}>
              <div  className="border-start border-start-4 border-start-success py-1 px-3">
                <div className="fs-5 fw-semibold small">Mobility Circularity Score</div>
                <div className="fs-5 fw-semibold">{mobility_circularity_score_suppliers}</div>
              </div>
            </CCol>
            <CCol sm={4}>
              <div className="border-start border-start-4 border-start-success py-1 px-3">
                <div className="fs-5 fw-semibold small">Mobility Circularity Score Overall</div>
                <div className="fs-5 fw-semibold">{mobility_circularity_overall_score_suppliers}</div>
              </div>
            </CCol>
            <CCol sm={4}>
              <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                <div className="fs-5 fw-semibold small">Average Distance Per Supplier</div>
                <div className="fs-5 fw-semibold">{average_distance_per_supplier} km</div>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={4}>
              <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                <div className="fs-5 fw-semibold small">Total CO2 Suppliers</div>
                <div className="fs-5 fw-semibold">{total_co2_overall_suppliers} kg</div>
              </div>
            </CCol>
            <CCol sm={4}>
              <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                <div className="fs-5 fw-semibold small">CO2 Per Supplier</div>
                <div className="fs-5 fw-semibold">{co2_per_supplier} kg</div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs={2}>

        </CCol>

        <CCol xs={8}>
          <CCard className="mb-4">
            <CCardHeader>Distribution of Transportation Types</CCardHeader>
            <CCardBody>
              <CChartRadar
                data={{
                  labels: distribution_of_means_of_transport_suppliers["items"], datasets: [{
                    label: "Distribution of Transportation Types",
                    backgroundColor: "rgba(34,50,162,0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(50, 50, 120, 1)",
                    data: distribution_of_means_of_transport_suppliers["counts"]
                  }]
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>;
  };

  const renderCardColor = (color) => {
    if (color)
    return `border-start border-start-4 border-start-${color} py-1 px-3`;

    return "border-start border-start-4 border-start-success py-1 px-3"
  };

  const renderVisitors = () => {
    const {
      multiple_chart_labels,
      multiple_chart_data,
      average_distance_per_visitor,
      distribution_of_means_of_transport,
      co2_per_visitor,
      mobility_circularity_score
    } = state.circularity_visitors;

    return <div>
      <CCard className="mb-4">
        <CCardHeader>Mobility {" & "} Visitors</CCardHeader>

        <CCardBody className="metricCard" style={{backgroundColor:"black", color:"white"}}>
          <CRow>
            <CCol sm={4}>
              <div className="border-start border-start-4 border-start-danger py-1 px-3">
                <div className="fs-5 fw-semibold small">Mobility Circularity Score</div>
                <div className="fs-5 fw-semibold">{mobility_circularity_score}%</div>
              </div>
            </CCol>
            <CCol sm={4}>
              {
                co2_per_visitor instanceof Object ?
                  <div>
                    <CTooltip
                      content={co2_per_visitor.tooltip}
                      placement="right"
                    >
                      <div className={renderCardColor(co2_per_visitor.color)}>
                        <div className="fs-5 fw-semibold small">CO2 Per Visitor</div>
                        <div className="fs-5 fw-semibold">{co2_per_visitor.data} kg</div>
                      </div>
                    </CTooltip>
                  </div>
                  :
                  <div className="border-start border-start-4 border-start-success py-1 px-3">
                    <div className="fs-5 fw-semibold small">CO2 Per Visitor</div>
                    <div className="fs-5 fw-semibold">{co2_per_visitor} kg</div>
                  </div>
              }

            </CCol>
            <CCol sm={4}>
              <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                <div className="fs-5 fw-semibold small">Average Distance Per Visitor</div>
                <div className="fs-5 fw-semibold">{average_distance_per_visitor} km</div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow>

        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>CO2 Emissions</CCardHeader>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: multiple_chart_labels, datasets: [{
                    backgroundColor: [colors[0], colors[1]],
                    data: multiple_chart_data
                  }]
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Distribution of Transportation Types</CCardHeader>
            <CCardBody>
              <CChartRadar
                data={{
                  labels: distribution_of_means_of_transport["items"], datasets: [{
                    label: "Distribution of Transportation Types",
                    backgroundColor: "rgba(34,50,162,0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(50, 50, 120, 1)",
                    data: distribution_of_means_of_transport["counts"]
                  }]
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>;
  };


  const renderMetrics = () => {
    console.log("------------");
    console.log(state);
    console.log("-----------");
    return <CAccordion activeItemKey={1} alwaysOpen>
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>Mobility & Visitors</CAccordionHeader>
        <CAccordionBody>
          {state && Object.keys(state.circularity_visitors).length > 0 ? renderVisitors() : null}
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem itemKey={2}>
        <CAccordionHeader>Mobility & Suppliers</CAccordionHeader>
        <CAccordionBody>
          {state && Object.keys(state.circularity_suppliers).length > 0 ? renderSuppliers() : null}

        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>;
  };

  console.log(state);
  return <div>
    <CRow>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CButton
          style={{ width: "100%", borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          onClick={() => setToggleRecomm(false)}
          color={!toggleRecomm ? "success" : "secondary"}>
          Metrics
        </CButton>
        <CButton
          style={{ width: "100%", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onClick={() => setToggleRecomm(true)}
          color={toggleRecomm ? "success" : "secondary"}>
          Recommendation</CButton>
      </div>

    </CRow>
    {
      !toggleRecomm ? renderMetrics() : <Recommendation data={state.recommendations}></Recommendation>
    }

  </div>;
};

export default Results;
