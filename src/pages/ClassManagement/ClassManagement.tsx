import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row, Select, Table, Tag, message } from "antd";
import Typography from "antd/es/typography/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import HomeLink from "../../components/HomeLink";
import { API_URL } from "../../services/helper";

const ClassManagement = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "idx",
      width: 50,
      render: (_: any, $: any, index: any) => index + 1,
    },
    {
      title: "Họ Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (value: any) => (value == 0 ? "Nam" : "Nữ"),
    },
    {
      title: "Năm Sinh",
      dataIndex: "dob",
      key: "dob",
      width: 150,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];

  const getClass = async () => {
    const resp = await axios.get(API_URL);
    return resp.data;
  };

  const [loadKey, setLoadKey] = useState<any>();

  const { data } = useQuery([loadKey], getClass);

  const [curClass, setCurClass] = useState<any[]>([]);
  const [curClassId, setCurClassId] = useState<string>("");

  const [messageApi, contextHolder] = message.useMessage();

  const [opt, setOpt] = useState<any[]>([]);

  const [student, setStudent] = useState<any>(null);

  const handleAdd = async () => {
    const record = data?.student?.find((item: any) => item.id === student);

    if (!record) {
      return;
    }

    const resp = await axios.put(API_URL, {
      ...data,
      class: data.class.map((item: any) => {
        if (item.id === curClassId) {
          if (item.students) {
            item.students.push(record);
          } else {
            item.students = [record];
          }
        }
        return item;
      }),
    });

    if (resp.statusText === "OK") {
      messageApi.success(`Thêm học sinh thành công!`, 2);
      setLoadKey(v4());
    } else {
      messageApi.error(`Thêm học sinh thất bại!`, 2);
    }
  };

  useEffect(() => {
    const curClassValue =
      data?.class?.find((item: any) => item.id == curClassId)?.students || [];

    setCurClass(
      data?.class?.find((item: any) => item.id == curClassId)?.students || []
    );
    setStudent(null);
    setOpt(
      data?.student
        ?.filter((item: any) =>
          curClassValue.some((c: any) => c.id === item.id) ? undefined : item
        )
        .map((item: any) => {
          return {
            value: item.id,
            label: item.fullName,
          };
        }) || []
    );
  }, [data, curClassId]);

  return (
    <div className="w-full">
      {contextHolder}
      <HomeLink />
      <div className="text-center p-12 text-2xl font-medium">Danh Sách Lớp</div>
      <Row className="justify-center">
        <Col span={6}>
          <div className="flex items-center gap-5">
            <Typography className="text-black font-medium">Lớp</Typography>
            <Select
              className="w-[200px]"
              options={data?.class?.map((item: any) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
              onSelect={(value: any) => {
                setCurClassId(value);
                setCurClass(
                  data?.class?.find((item: any) => item.id == value).students ||
                    []
                );
              }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div className="flex items-center gap-5">
            <Typography className="text-black font-medium">
              Sĩ số: <Tag>{curClass.length}</Tag>
            </Typography>
          </div>
        </Col>
      </Row>
      <Row className="justify-center mt-5">
        <Col span={20}>
          <Select
            options={opt}
            className="w-[200px] mr-2"
            value={student}
            onSelect={setStudent}
          />
          <Button type="primary" className="bg-blue-500" onClick={handleAdd}>
            Thêm
          </Button>
        </Col>
      </Row>
      <Row className="justify-center mt-5">
        <Col span={20}>
          <Table columns={columns} dataSource={curClass} bordered />
        </Col>
      </Row>
    </div>
  );
};

export default ClassManagement;
