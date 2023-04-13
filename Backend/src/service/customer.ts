import { compareSync } from "bcrypt";
import { Customer, CustomerAttributes } from "../models/customer";
let getCustomer = async (email: CustomerAttributes["Email"], password: CustomerAttributes["Password"]) => {
  const customer = await Customer.findOne({ where: { Email: email } });
  if (!customer) {
    console.log("Unable to login");
    return false
  }
  const passwordMatch = compareSync(password, customer.Password);
  if (!passwordMatch) {
    console.log("Unable to login");
    return false;
  }
  return customer
}
let create = async(data: CustomerAttributes) => {
  const customer = await new Customer(data)
  try {
      await customer.save()
      return customer      

  } catch (e) {
      return e
  }
}
export { getCustomer, create }