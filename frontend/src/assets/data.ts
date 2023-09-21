export interface StateOption {
    readonly value: string;
    readonly label: string;
  }
  
export const stateOptions: readonly StateOption[] = [
    { value: 'Quantity', label: 'Quantity' },
    { value: 'Total', label: 'Total' },
    { value: 'Total_price', label: 'Total_price' },
    { value: 'Discount', label: 'Discount' },
   ]

export interface OrderOption{
    readonly value:string;
    readonly label:string;

}

export const OrderOption : readonly OrderOption[]=[
    { value: 'ASC', label: 'ASC' },
    { value: 'DESC', label: 'DESC' },
]