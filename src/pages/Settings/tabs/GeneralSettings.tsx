import { useQuery } from "@tanstack/react-query";
import { Button, Form, InputNumber, message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../../services/helper";

const GeneralSettings = () => {
  const [form] = Form.useForm();

  const getData = async () => {
    const resp = await axios.get(API_URL);

    return resp.data;
  };

  const { data } = useQuery([], getData);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (data && data.generalSetting) {
      console.log(data.generalSetting);
      form.setFieldsValue(data.generalSetting);
    }
  }, [data]);

  const handleSave = async () => {
    const resp = await axios.put(API_URL, {
      ...data,
      generalSetting: form.getFieldsValue(),
    });

    if (resp.statusText === "OK") {
      messageApi.success("Cập nhật thành công!", 2);
    } else {
      messageApi.error("Cập nhật thất bại!", 2);
    }
  };

  return (
    <div>
      {contextHolder}
      <Form form={form} onFinish={handleSave}>
        <Form.Item
          label="Tuổi tối thiểu"
          required
          name="minAge"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Tuổi tối đa"
          required
          name="maxAge"
          rules={[{ required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Điểm đạt"
          required
          name="passPoint"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={10} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="bg-blue-400" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralSettings;
