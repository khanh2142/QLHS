import { useQuery } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
import { v4 } from "uuid";
import HomeLink from "../../components/HomeLink";
import { API_URL } from "../../services/helper";

const AddStudent = () => {
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const [loadKey, setLoadKey] = useState<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} không được để trống!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const [editingKey, setEditingKey] = useState("");
  const [type, setType] = useState({
    title: "Thêm mới",
    curType: "add",
  });

  const edit = (record: any) => {
    form.setFieldsValue({
      ...record,
      dob: dayjs(record.dob, "DD/MM/YYYY"),
    });
    setEditingKey(record.id);
    setIsModalCreateOpen(true);
    setType({ title: "Cập nhật học sinh", curType: "update" });
  };

  const cancel = () => {
    setEditingKey("");
  };

  const showModal = (record: any) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const resp = await axios.put(API_URL, {
      ...data,
      class: data.class.filter((item: any) => item.id != currentRecord.id),
    });

    if (resp.statusText === "OK") {
      messageApi.success("Xoá lớp học thành công!", 2);
      setLoadKey(Math.random());
    } else {
      messageApi.error("Xoá lớp học thất bại!", 2);
      setLoadKey(Math.random());
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "Idx",
      editable: false,
      width: 50,
      render: (_: any, $: any, index: any) => index + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      editable: true,
      width: 300,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      editable: true,
      width: 150,
      render: (_: any, $: any, index: any) => ($.gender == 0 ? "Nam" : "Nữ"),
      inputType: "select",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      editable: true,
      width: 300,
      inputType: "",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      editable: true,
      width: 300,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
      width: 300,
    },
    {
      title: "",
      dataIndex: "id",
      width: 300,
      render: (_: any, record: any) => {
        return (
          <div className="flex gap-2">
            <Button
              className="bg-teal-400"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Cập nhật
            </Button>
            <Button
              className="bg-red-500"
              disabled={editingKey !== ""}
              onClick={() => showModal(record)}
            >
              Xoá
            </Button>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    const resp = await axios.get(`${API_URL}`);

    return resp.data;
  };

  const { data, isFetching } = useQuery([loadKey], getData, {
    refetchOnWindowFocus: false,
  });

  const handleCreate = async () => {
    const check = await form
      .validateFields()
      .then(() => true)
      .catch(() => false);

    if (check) {
      const curValue = form.getFieldsValue();

      let obj: any;

      if (type.curType === "add") {
        obj = {
          ...data,
          student: [
            ...data.student,
            {
              ...curValue,
              dob: moment(curValue.dob.$d).format("DD/MM/YYYY"),
              id: v4(),
            },
          ],
        };
      }

      if (type.curType === "update") {
        obj = {
          ...data,
          student: data.student.map((item: any) => {
            if (item.id === editingKey) {
              return {
                ...curValue,
                dob: moment(curValue.dob.$d).format("DD/MM/YYYY"),
              };
            }
            return item;
          }),
        };
      }

      const resp = await axios.put(API_URL, obj);

      if (resp.statusText === "OK") {
        messageApi.success(`${type.title} học sinh thành công!`, 2);
        setLoadKey(Math.random());
        setIsModalCreateOpen(false);
        setEditingKey("");
      } else {
        messageApi.error(`${type.title} học sinh thất bại!`, 2);
        setIsModalCreateOpen(false);
        setEditingKey("");
      }
    }
  };

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  return (
    <div className="p-12">
      {contextHolder}
      <HomeLink />
      <div className="text-center p-12 text-2xl font-medium">
        Hồ Sơ Học Sinh
      </div>

      <Button
        className="mb-2 bg-green-500"
        onClick={() => {
          setIsModalCreateOpen(true);
          setType({ title: "Thêm mới học sinh", curType: "add" });
        }}
      >
        Thêm
      </Button>

      <Table
        bordered
        dataSource={data ? data.student : []}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        loading={isFetching}
      />

      <Modal
        title="Xóa lớp học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-red-500" }}
      >
        <Typography>
          Bạn có muốn học sinh: <Tag>{currentRecord?.fullName}</Tag>
        </Typography>
      </Modal>

      <Modal
        title={type.title}
        open={isModalCreateOpen}
        onOk={handleCreate}
        onCancel={() => {
          setIsModalCreateOpen(false);
          setEditingKey("");
        }}
        okButtonProps={{ className: "bg-green-500" }}
      >
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          layout="vertical"
          form={form}
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value="0">Nam</Radio>
              <Radio value="1">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="dob" label="Ngày sinh" rules={[{ required: true }]}>
            <DatePicker placeholder="Chọn ngày" format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Vui lòng nhập định dạng Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddStudent;
