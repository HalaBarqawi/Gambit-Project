import PaginationComponent from "../component/pagination";
function TransactonCard(props: any) {
  const handlePageClick = async (data: any) => {
    console.log(data.selected);

    let currentPage = data.selected;
    await props.setcurrentPage(currentPage);

    const commentsFormServer = await props.fetchComments(currentPage);

    await props.setItems(commentsFormServer);
  };
  const handlefilterClick = async (data: any) => {
    console.log(data.selected);

    let currentPage = data.selected;
    await props.setcurrentPage(currentPage);

    const commentsFormServer = await props.fetchFilter(currentPage);

    await props.setItems(commentsFormServer);
  };

  return (
    <div className="container">
      <div className="row m-2">
        {props.items ? (
          props.items.map((item: any) => {
            return (
              <div key={item.Id} className="col-sm-6 col-md-4 v my-2">
                <div
                  className="card shadow-sm w-100"
                  style={{ minHeight: 225 }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-center h2">
                      Id :{item.Id}{" "}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      Quantity {item.Quantity} , Taxes {item.Price_per_Unit}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      Discount {item.Discount} , Taxes {item.Taxes}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      Total Price {item.Total_price}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      Total {item.Total}
                    </h6>

                    <p className="card-text">Currency in {item.Currency}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h4>There is no items </h4>
          </div>
        )}
      </div>

      {props.filter ? (
        <PaginationComponent
          pageCount={props.pageCount}
          pageFunction={handlefilterClick}
        />
      ) : (
        <PaginationComponent
          pageCount={props.pageCount}
          pageFunction={handlePageClick}
        />
      )}
    </div>
  );
}

export default TransactonCard;
