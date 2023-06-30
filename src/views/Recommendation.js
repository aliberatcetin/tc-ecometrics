import React from "react";
import {
  CAccordion, CAccordionBody,
  CAccordionHeader, CAccordionItem,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol, CListGroup, CListGroupItem,
  CRow
} from "@coreui/react";
import ReactImg from "../assets/images/react.jpg";

function Recommendation(props) {
  return (
    <div>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 4 }}>
        {
          props.data.slice(0,19).map((item, index) => {
            return <CCol key={index} xs>
              <CCard>
                <CCardImage orientation="top" height={220}  src={item.image_url} />

                <CAccordion>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader> <CCardTitle> {item["best_practice"]}</CCardTitle></CAccordionHeader>
                    <CAccordionBody>

                    <CCardBody>

                      <CCardText>
                        {item["description"]}
                      </CCardText>
                    </CCardBody>


                    <CCardFooter key={item}>

                      <CListGroup>
                        {
                          item["kpis"] !== null && item["kpis"].length > 2 &&
                          <CListGroupItem component="a" href="#" active>
                            Effective KPIS

                          </CListGroupItem>
                        }
                        {item["kpis"] !== null && item["kpis"].length > 2 &&

                          item["kpis"].map((item2, index2) => {
                            return <div key={item2}>
                              <CListGroupItem component="a" href="#">
                                <small className="text-medium-emphasis">{item2}</small>

                              </CListGroupItem>


                            </div>;

                          })

                        } </CListGroup>

                    </CCardFooter>

                    {
                      item["startups"] !== null && item["startups"].length > 2 && <CCardFooter>
                        <small className="text-medium-emphasis">{item["startups"]}, <a target="blank"
                                                                                       href={item["link"]}>{item["link"]}</a></small>
                      </CCardFooter>
                    }
                    </CAccordionBody>
                  </CAccordionItem>
                </CAccordion>


              </CCard>
            </CCol>;
          })
        }
      </CRow>


    </div>
  );
}

export default Recommendation;
