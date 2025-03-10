import React, { useEffect, useRef, useState } from "react";
import { styled, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import ContentWrapper from "shared/utils/layout/content-wrapper";
import CustomContainer from "shared/utils/layout/container";
import Header from "./header/Header";
import { ReactTableScroll } from 'react-table-scroll'
import { useSelector } from "react-redux";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  height: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  marginBottom: "20px",
  zIndex: 1,
  backgroundColor: 'transparent',
  flexGrow: 1,
  flexDirection: "column",
  height: "100vh",
  overflow: "hidden",
  overflowY: "auto",

}));


const FullLayout = ({ setToken }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pageWrapperRef = useRef(null);

  const candidateRegistrationcurrentPageNo = useSelector((state) => state.CandidatePageSlice.currentPageNo);

  useEffect(() => {
    if (pageWrapperRef.current.children[1]) {
      const scrollableElement = pageWrapperRef.current.children[1];
      scrollableElement.style.overflow = "auto";
      scrollableElement.scrollTo(0, 0);
    }
  }, [candidateRegistrationcurrentPageNo])

  return (
    <MainWrapper className='mainwrapper'>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper ref={pageWrapperRef}>
        {/* <PageWrapper> */}
        <Header
          setToken={setToken}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <ReactTableScroll style={{
          display: 'block',
          width: '100%',
          position: 'relative',
          zIndex: 9999,
          height: '100%',
        }} >
          <Box sx={{ minHeight: 'calc(100vh - 170px)', marginBottom: '40px' }}>
            <CustomContainer >
              <ContentWrapper>
                <Outlet />
              </ContentWrapper>
            </CustomContainer>
          </Box>
        </ReactTableScroll>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
