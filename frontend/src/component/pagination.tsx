import ReactPaginate from "react-paginate";
import "../assets/paginate.css";

function PaginationComponent(props: any) {
  return (
    <ReactPaginate
      previousLabel={"<<"}
      nextLabel={">>"}
      breakLabel={"..."}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.pageFunction}
      // containerClassName={"pagination justify-content-center"}
      // pageClassName={"page-item"}
      // pageLinkClassName={"page-link"}
      // previousClassName={"page-item"}
      // previousLinkClassName={"page-link"}
      // nextClassName={"page-item"}
      // nextLinkClassName={"page-link"}
      // breakClassName={"page-item"}
      // breakLinkClassName={"page-link"}
      // activeClassName={"active"}
      containerClassName={"pagination justify-content-center "}
      previousClassName={"previous page-item"}
      previousLinkClassName={"nextLink "}
      breakClassName={"break page-item"}
      nextClassName={"next page-item"}
      nextLinkClassName={"nextLink  "}
      pageClassName={"page page-item"}
      disabledClassName={"disabled"}
      activeClassName={"active"}
    />
  );
}
export default PaginationComponent;

