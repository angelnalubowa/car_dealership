import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const DynamicForm = ({ schema, form, onFinish }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      {schema?.map((field) => (
        <Form.Item
          key={field.key}
          label={field.placeholder}
          name={field.key}
          rules={[
            {
              required: true,
              message: `Please input the ${field.placeholder}!`,
            },
          ]}
        >
          {field.type === "select" ? (
            <Select placeholder={`Select ${field.placeholder}`}>
              {field.options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Input placeholder={field.placeholder} />
          )}
        </Form.Item>
      ))}
    </Form>
  );
};

export default DynamicForm;