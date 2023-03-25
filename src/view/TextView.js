import React from "react";
import { Input} from "antd";

const { TextArea } = Input;

const TextView = (props) => {
  const { value, onChange } = props;
  return (
    <div>
      <TextArea rows={10} value={value} onChange={onChange} />
    </div>
  );
};

export default TextView;
