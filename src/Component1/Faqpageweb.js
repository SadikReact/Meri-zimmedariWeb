import React, { useState } from "react";
import NavBar from "./NavBar";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
const Faqpageweb = () => {
  const [open, setOpen] = useState("");
  const toggle = id => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <>
      <div className="container-fluid " style={{ display: "inline-block" }}>
        <div
          class="header"
          style={{
            marginLeft: "-15px",
            boxShadow: "0 0 10px  #2374ee",
            marginTop: "-20px",
          }}
        >
          <NavBar />
        </div>
        <div>
          <div class="container" style={{ paddingTop: "6rem" }}>
            <div class="row">
              <div class="col-md-12">
                <div class="titlepage text_align_center">
                  <h2>Frequently Asked Questions</h2>
                </div>
                <div
                  class="mb-5"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <form
                    class="example00110011"
                    style={{ width: "70%", borderRadius: "20px" }}
                  >
                    <input
                      type="text"
                      placeholder="Search.."
                      name="search"
                      style={{
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        color="#5578B0"
                        width="22"
                        height="22"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </button>
                  </form>
                </div>
                <div>
                  <div class="row m-2">
                    <div class="col-md-2 col-sm-2 col-lg-2 col-sm-1  "></div>
                    <div class="col-md-8 col-sm-8 col-lg-8 col-sm-10 col-12">
                      <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingTwo">
                            <button
                              style={{
                                width: "100%",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                              }}
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              What do M do?
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <ul>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      1.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      We all spend our whole life in earning &
                                      saving money for our loved ones. Generally
                                      we invest our money in many forms like
                                      FDs, RDs, Mutual Fund, Stock Market, Term
                                      insurance etc. and sometimes share these
                                      information with our family so that they
                                      can withdraw these investments if due to
                                      any unfortunate event we will not be here
                                      in this world any more.
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      2.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      But What if our loved ones doesn't have
                                      proper information of all the savings done
                                      by us at that point of time.
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      3.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      It is a horrible dream that our hard
                                      earned money will remain in banks and our
                                      loved ones will not be able to use it.
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      4.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      So here comes the M, M provide a special
                                      platform to the user where he can save all
                                      his investment details along with
                                      nominee(s) details, M keeps track on
                                      living state of user by asking him to
                                      blink his eyes in front of the camera on
                                      monthly basis. The user investment
                                      information will not be shared with anyone
                                      until he is alive.
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      5.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      If user fails to blink in front of camera
                                      on scheduled date of the month then
                                      multiple follow-up will be done by M. If
                                      no response will be received then M will
                                      do follows with nominee. If nominee
                                      confirms the death of user then M will ask
                                      nominee to upload the death certificate of
                                      user. On receiving the valid death
                                      certificate all asset details will be
                                      shared with respective nominee only in
                                      English and regional language selected by
                                      the user.
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      6.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      If user fails to blink in front of camera
                                      on scheduled date of the month then
                                      multiple follow-up will be done by M. If
                                      no response will be received then M will
                                      do follows with nominee. If nominee
                                      confirms the death of user then M will ask
                                      nominee to upload the death certificate of
                                      user. On receiving the valid death
                                      certificate all asset details will be
                                      shared with respective nominee only in
                                      English and regional language selected by
                                      the user.
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item mt-4">
                          <h2 class="accordion-header" id="headingThree">
                            <button
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                              }}
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              How M will ensure my alive status.
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <ul>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      1.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      It's very simple you just need to open
                                      camera on app and blink your eyes aur
                                      image will automatically capture on eye
                                      blink which will confirm the living status
                                      of indivitual.
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item mt-4">
                          <h2 class="accordion-header" id="headingFour">
                            <button
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                              }}
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              How M will share asset details if anyone have
                              added multiple nominee.
                            </button>
                          </h2>
                          <div
                            id="collapseFour"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <ul>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      1.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      Each nominee will get the information of
                                      only those assets on which he is
                                      nominated.
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item mt-4">
                          <h2 class="accordion-header" id="headingFive">
                            <button
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                              }}
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFive"
                              aria-expanded="false"
                              aria-controls="collapseFive"
                            >
                              Who will be asked for sharing death certificate if
                              user have added multiple nominee.
                            </button>
                          </h2>
                          <div
                            id="collapseFive"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingFive"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <ul>
                                <li>
                                  <div class="row">
                                    <div class="col-md-1 col-sm-1 col-lg-1 col-xl-1 col-1">
                                      1.
                                    </div>
                                    <div class="col-md-11 col-sm-11 col-lg-11 col-xl-11 col-11">
                                      Maximum share holder will be asked first
                                      and if not death certificate not recived
                                      then all other nominee will be contacted.
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2 col-lg-2 col-sm-1 "></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row m-2">
          <div class="col-md-2 col-sm-2 col-lg-2 col-sm-1  "></div>
          <div class="col-md-8 col-sm-8 col-lg-8 col-sm-10 col-12">
            <Accordion
              flush
              open={open}
              toggle={toggle}
              style={{ width: "100%" }}
            >
              <AccordionItem style={{ width: "100%" }}>
                <AccordionHeader targetId="1" style={{ width: "100%" }}>
                  <button style={{ width: "100%" }}>Accordion Item 1</button>
                </AccordionHeader>
                <AccordionBody accordionId="1" style={{ width: "100%" }}>
                  <strong>This is the first item&#39;s accordion body.</strong>
                  You can modify any of this with custom CSS or overriding our
                  default variables. It&#39;s also worth noting that just about
                  any HTML can go within the <code>.accordion-body</code>,
                  though the transition does limit overflow.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">Accordion Item 2</AccordionHeader>
                <AccordionBody accordionId="2">
                  <strong>This is the second item&#39;s accordion body.</strong>
                  You can modify any of this with custom CSS or overriding our
                  default variables. It&#39;s also worth noting that just about
                  any HTML can go within the <code>.accordion-body</code>,
                  though the transition does limit overflow.
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="3">Accordion Item 3</AccordionHeader>
                <AccordionBody accordionId="3">
                  <strong>This is the third item&#39;s accordion body.</strong>
                  You can modify any of this with custom CSS or overriding our
                  default variables. It&#39;s also worth noting that just about
                  any HTML can go within the <code>.accordion-body</code>,
                  though the transition does limit overflow.
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
          <div class="col-md-2 col-sm-2 col-lg-2 col-sm-1  "></div>
        </div>
      </div>
    </>
  );
};

export default Faqpageweb;
