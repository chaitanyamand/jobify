import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AllJobsContext } from "../pages/AllJobs";
import { useContext } from "react";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useContext(AllJobsContext);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //FirstPage
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    //oneBeforeCurrentPage
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    //currentPage
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    //oneAfterCurrentPage
    if (currentPage !== numOfPages - 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    //LastPage
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
