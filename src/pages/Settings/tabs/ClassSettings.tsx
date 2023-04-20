import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { API_URL } from "../../../services/helper";

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
  id?: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: string;
  record: any;
  index: number;
  children: React.ReactNode;
  defaultValue: any;
  rule?: any;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  defaultValue,
  rule,
  ...restProps
}) => {
  const listComp = [
    {
      type: "number",
      comp: <InputNumber type="number" />,
    },
    {
      type: "select",
      comp: (
        <Select
          defaultValue={defaultValue}
          options={[
            { value: "0", label: "Nam" },
            { value: "1", label: "Nữ" },
          ]}
        ></Select>
      ),
    },
    {
      type: "datepicker",
      comp: <></>,
    },
    {
      type: "text",
      comp: <Input />,
    },
  ];

  const inputNode = listComp.find((item) => inputType === item.type)?.comp;

  const rules = rule
    ? [
        ...rule,
        {
          required: true,
          message: `Vui lòng nhập ${title}!`,
        },
      ]
    : [
        {
          required: true,
          message: `Vui lòng nhập ${title}!`,
        },
      ];

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }} rules={rules}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ClassSettings = () => {
  const [form] = Form.useForm();
  const [createForm] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");

  const [loadKey, setLoadKey] = useState<any>();

  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const getClass = async () => {
    return await fetch(`${API_URL}`).then((res) => res.json());
  };

  const { data, isFetching } = useQuery([loadKey], getClass, {
    refetchOnWindowFocus: false,
  });

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (record: any) => {
    try {
      const formValue = form.getFieldsValue();

      const curRecord = { ...record, ...formValue };

      const resp = await axios.put(API_URL, {
        ...data,
        class: data.class.map((item: any) => {
          if (item.id === curRecord.id) {
            return curRecord;
          }
          return item;
        }),
      });

      if (resp.statusText === "OK") {
        setEditingKey("");
        messageApi.success("Cập nhật thành công!", 2);
        setLoadKey(Math.random());
      } else {
        setEditingKey("");
        messageApi.error("Cập nhật thất bại!", 2);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Tên lớp",
      dataIndex: "name",
      editable: true,
      width: 300,
    },
    {
      title: "Sĩ số tối đa",
      dataIndex: "maxQuantity",
      width: 200,
      editable: true,
      render: (_: any, item: any) => <Tag color="red">{item.maxQuantity}</Tag>,
    },
    {
      title: "Sĩ số hiện tại",
      dataIndex: "quantity",
      editable: false,
      width: 200,
      render: (_: any, item: any) => (
        <Tag color="blue">{item?.students?.length || 0}</Tag>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      width: 300,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              className="bg-green-600"
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Button>
            <Button className="bg-yellow-400" onClick={cancel}>
              Thoát
            </Button>
          </span>
        ) : (
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "maxQuantity" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

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

  const handleCreate = async () => {
    const check = await createForm
      .validateFields()
      .then(() => true)
      .catch(() => false);

    if (check) {
      const curValue = createForm.getFieldsValue();

      const resp = await axios.put(API_URL, {
        ...data,
        class: [...data.class, { id: uuid(), ...curValue, quantity: 0 }],
      });

      if (resp.statusText === "OK") {
        messageApi.success("Tạo mới thành công!", 2);
        setLoadKey(Math.random());
        setIsModalCreateOpen(false);
        createForm.resetFields();
      } else {
        messageApi.error("Tạo mới thất bại!", 2);
      }
    }
  };

  return (
    <div>
      {contextHolder}

      <Button
        className="mb-2 bg-green-500"
        onClick={() => setIsModalCreateOpen(true)}
      >
        Thêm
      </Button>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data ? data.class : []}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          loading={isFetching}
        />
      </Form>

      <Modal
        title="Xóa lớp học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-red-500" }}
      >
        <Typography>
          Bạn có muốn xóa lớp học: <Tag>{currentRecord?.name}</Tag>
        </Typography>
      </Modal>

      <Modal
        title="Thêm lớp học"
        open={isModalCreateOpen}
        onOk={handleCreate}
        onCancel={() => setIsModalCreateOpen(false)}
        okButtonProps={{ className: "bg-green-500" }}
      >
        <Form
          layout="vertical"
          form={createForm}
          validateMessages={{ required: "${label} không được để trống!" }}
        >
          <Form.Item
            label="Tên lớp"
            required
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sĩ số tối đa"
            required
            name="maxQuantity"
            rules={[{ required: true }]}
          >
            <InputNumber type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassSettings;
