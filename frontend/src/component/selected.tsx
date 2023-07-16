import Select from "react-select";
import { OrderOption, stateOptions } from "../assets/data";
import { Button, InputNumber, Space } from "antd";

export default function MyComponent(props: any) {
  const onChange = (value: any) => {
    console.log("changed", value);
    props.setPrice(parseInt(value));
  };
  const onQuantityChange = (value: any) => {
    console.log("changed", value);
    props.setQuantity(parseInt(value));
  };
  const handleChange = async (value: any) => {
    await props.setOrder(value.value);
    console.log(props.order);
    console.log(props.orderType);
  };
  const handlOrderChange = async (value: any) => {
    await props.setOrderType(value.value);
    console.log(props.order);
    console.log(props.orderType);
  };

  async function apply() {
    const result = await props.fetchFilter();
    await props.setItems(result);
    await props.setFilter(true);
  }
  return (
    <div
      style={{
        marginLeft: 130,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        // value={props.order}
        onChange={handleChange}
        options={stateOptions}
        placeholder="Order By"
        defaultValue={stateOptions[1]}
      />
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        defaultValue={OrderOption[1]}
        onChange={handlOrderChange}
        options={OrderOption}
        placeholder="Order with"
      />
      <label style={{ marginTop: 5 }}> Total Price more than :</label>
      <Space>
        <InputNumber
          size="large"
          min={1}
          max={100000}
          defaultValue={3}
          onChange={onChange}
        />
      </Space>
      <label style={{ marginTop: 5 }}> Quantity less than :</label>
      <Space>
        <InputNumber
          size="large"
          min={1}
          max={100000}
          defaultValue={3}
          onChange={onQuantityChange}
        />
      </Space>
      <Button type="primary" danger onClick={apply}>
        Apply
      </Button>
    </div>
  );
}
