import ReactPaginate from "react-paginate";
function PaginationComponent(props: any) {
  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.pageFunction}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}
export default PaginationComponent;
