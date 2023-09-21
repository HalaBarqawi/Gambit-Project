import Select from "react-select";
import { OrderOption, stateOptions } from "../assets/data";
import { Button, InputNumber, Space } from "antd";
import { Left } from "react-bootstrap/lib/Media";

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
    await props.setItems(result.content);
    await props.setFilter(true);
    await props.setpageCountFilter(result.totalPages);
  }

  return (
    <div
      style={{
        marginLeft: 90,
        marginBottom: 40,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        gap: 20,
      }}
    >
      <div>
        <label style={{ marginTop: 10, marginRight: 10 }}>
          {" "}
          Quantity less than :{" "}
        </label>
        <Space>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            defaultValue={3}
            onChange={onQuantityChange}
          />
        </Space>
      </div>
      <div>
        <label style={{ marginTop: 10, marginRight: 10 }}>
          {" "}
          Total Price more than :{" "}
        </label>
        <Space>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            defaultValue={3}
            onChange={onChange}
          />
        </Space>
      </div>

      <div
        style={{
          marginTop: 10,
          gap: 20,
          display: "flex",
          flexDirection: "row",
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
      </div>
      <Button
        type="primary"
        danger
        onClick={apply}
        style={{ height: 38, marginTop: 10 }}
      >
        Apply
      </Button>
    </div>
  );
}
