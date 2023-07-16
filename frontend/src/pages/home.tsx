import { useEffect, useState } from "react";
import "../assets/App.css"
import MyComponent from "../component/selected";
import { useLogin } from "../context/AuthContext";

import NavBar from "./NavBar";
import TransactonCard from "./transactionCard";

export default function Home() {
    const { isLoggedIn }: any = useLogin();
    const [items, setItems] :any= useState([]);
    const [order , setOrder]= useState('Quantity')
    const [orderType , setOrderType]=useState('ASC')
    const [currentPage , setcurrentPage]=useState()
    const [price , setPrice]=useState()
    const[quantity, setQuantity]=useState()
    const { profile }: any = useLogin();
    const [pageCount, setpageCount] = useState(0);
    const[filter , setFilter]=useState(false);
    let limit = 10;

  useEffect(() => {
    const getTrans = async () => {
      const res : Response & any= await fetch(
        `http://localhost:8081/transactions?page=0&size=${limit}`,
        {
            headers: {   Authorization: `Bearer ${profile}`
        }
        }
      );
      const data = await res.json();
      console.log(data)
      const total :any= data.data.totalPages;
      setpageCount(Math.ceil(parseInt(total)));
      console.log(total);
      setItems(data.data.content);
    };
    console.log(items)

    getTrans();
  }, [limit]);

  const fetchComments = async (currentPage:any) => {
    const res = await fetch(
      `http://localhost:8081/transactions?page=${currentPage}&size=${limit}`,
   {   headers: {   Authorization: `Bearer ${profile}`
    }}
    );
    const data = await res.json();
    return data.data.content;
  };

  const fetchFilter = async () => {
    const res = await fetch(
      `http://localhost:8081/filterTransactions?orderBy=${order}&order=${orderType}&page=${currentPage}&size=${limit}&totalPrice=${price}&quantity=${quantity}`,
   {   headers: {   Authorization: `Bearer ${profile}`
    }}
    );
    const data = await res.json();
    return data.data.content;
  };
    return (
        isLoggedIn ? (
            <div className="App">
                 <NavBar />
               
                <h1 style={{marginTop:70 ,   marginRight:1000 }}> Transaction : </h1>
                <h5 style={{marginTop:20 ,   marginRight:1150 }}> Filters : </h5>

                <MyComponent order={order} setOrder={setOrder} items={items} setItems={setItems} setFilter={setFilter} setQuantity={setQuantity} setPrice={setPrice} orderType={orderType} setOrderType={setOrderType} fetchFilter={fetchFilter}/>
                <TransactonCard pageCount={pageCount} setpageCount={setpageCount} items={items} setFilter={setFilter} filter={filter} setItems={setItems} fetchComments={fetchComments} setcurrentPage={setcurrentPage}  fetchFilter={fetchFilter}/>
               
            </div>
        ) : (
            <div>
                <h1>Unauthorized</h1>
            </div>
        )
    );
}
