import { useEffect, useState } from "react";
import "../assets/App.css";
import MyComponent from "../component/selected";
import { useLogin } from "../context/AuthContext";
import Login from "./login";
import Card from "react-bootstrap/Card";

import NavBar from "./NavBar";
import TransactonCard from "./transactionCard";

export default function Home() {
  const { isLoggedIn }: any = useLogin();
  const [items, setItems]: any = useState([]);
  const [order, setOrder] = useState("Quantity");
  const [orderType, setOrderType] = useState("ASC");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const { profile }: any = useLogin();
  const [pageCount, setpageCount] = useState(0);
  const [filter, setFilter] = useState(false);
  const [currentPage, setcurrentPage] = useState();
  const [pageCountFilter, setpageCountFilter] = useState();

  let limit = 10;

  useEffect(() => {
    const getTrans = async () => {
      const res: Response & any = await fetch(
        `http://localhost:8081/transactions?page=0&size=${limit}`,
        {
          headers: { Authorization: `Bearer ${profile}` },
        }
      );
      const data = await res.json();
      console.log(data);
      const total: any = data.data.totalPages;
      setpageCount(Math.ceil(parseInt(total)));
      console.log(total);
      setItems(data.data.content);
    };
    console.log(items);

    getTrans();
  }, [limit]);

  const fetchItems = async (currentPage: any) => {
    const res = await fetch(
      `http://localhost:8081/transactions?page=${currentPage}&size=${limit}`,
      { headers: { Authorization: `Bearer ${profile}` } }
    );
    const data = await res.json();
    return data.data.content;
  };

  const fetchFilter = async () => {
    const res = await fetch(
      `http://localhost:8081/filterTransactions?orderBy=${order}&order=${orderType}&page=${currentPage}&size=${limit}&totalPrice=${price}&quantity=${quantity}`,
      { headers: { Authorization: `Bearer ${profile}` } }
    );
    const data = await res.json();
    return data.data;
  };
  return isLoggedIn ? (
    <div className="App">
      <NavBar />

      <h3 style={{ marginTop: 70, marginBottom:40  }}>   <Card.Header > Transactions List</Card.Header></h3>
     

     

      <MyComponent
        order={order}
        setOrder={setOrder}
        items={items}
        setItems={setItems}
        setpageCountFilter={setpageCountFilter}
        setFilter={setFilter}
        setQuantity={setQuantity}
        setPrice={setPrice}
        orderType={orderType}
        setOrderType={setOrderType}
        fetchFilter={fetchFilter}
      />
      <TransactonCard
        setcurrentPage={setcurrentPage}
        pageCount={pageCount}
        pageCountFilter={pageCountFilter}
        items={items}
        setFilter={setFilter}
        filter={filter}
        setItems={setItems}
        fetchItems={fetchItems}
        fetchFilter={fetchFilter}
      />
    </div>
  ) : (    <div>
    {" "}
    <Login />{" "}
  </div>
  );
}
