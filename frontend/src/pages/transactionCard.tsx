import PaginationComponent from "../component/pagination";
import * as ReactBootStrap from "react-bootstrap";

function TransactonCard(props: any) {
  const handlePageClick = async (data: any) => {
    console.log(data.selected);

    let currentPage = data.selected;
    await props.setcurrentPage(currentPage);

    const dataFormServer = await props.fetchItems(currentPage);

    await props.setItems(dataFormServer);
  };
  const handlefilterClick = async (data: any) => {
    console.log(data.selected);

    let currentPage = data.selected;
    await props.setcurrentPage(currentPage);

    const dataFormServer = await props.fetchFilter(currentPage);

    await props.setItems(dataFormServer.content);
  };

  return (
    <div className="container">
      <div>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Currency</th>
              <th>Price/Unit</th>
              <th>Discount</th>
              <th>Taxes</th>
              <th>Total price</th>
              <th>Total </th>
            </tr>
          </thead>
          <tbody>
            {props.items ? (
              props.items.map((item: any) => (
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>{item.Quantity} </td>
                  <td>{item.Currency}</td>
                  <td>{item.Price_per_Unit}</td>
                  <td>{item.Discount}</td>
                  <td>{item.Taxes}</td>
                  <td>{item.Total_price}</td>
                  <td>{item.Total}</td>
                  <td>{item.Total}</td>
                </tr>
              ))
            ) : (
              <div>
                <h4>There is no items </h4>
              </div>
            )}
          </tbody>
        </ReactBootStrap.Table>
      </div>
      {props.filter ? (
        <PaginationComponent
          pageCount={props.pageCountFilter}
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
