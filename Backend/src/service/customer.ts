import {pool} from "../config/database";
 let getUserByUserEmail = (email :any, callBack :any) => {
        pool.query(
            `select * from customers where email = ?`,
            [email],
            (error:any, results:any, fields:any) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            }
          );
    }

let create =(data:any , callBack:any)=>{
    pool.query(`INSERT INTO customers (Email, UserName, FirstName, LastName, Password) 
    VALUES (?,?,?,?,?)`,
    [data.Email,
        data.UserName,
        data.FirstName,
        data.LastName,
    data.Password],
    (error:any,results :any )=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results);
    }
    )
}
export {getUserByUserEmail , create}