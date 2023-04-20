import { Col, Row, Select, Table, Typography } from "antd";
import HomeLink from "../../components/HomeLink";

const Point = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      width: 50,
    },
    {
      title: "Họ Tên",
      dataIndex: "age",
      key: "age",
      width: 300,
    },
    {
      title: "Điểm 15 phút",
      dataIndex: "address",
      key: "address",
      width: 120,
    },

    {
      title: "Điểm 1 tiết",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
    {
      title: "Điểm trung bình",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
  ];

  return (
    <div>
      <HomeLink />
      <div className="text-center p-12 text-2xl font-medium">
        Bảng Điểm Môn Học
      </div>
      <Row className="">
        <Col span={6} offset={4}>
          <div className="flex items-center gap-5">
            <Typography className="text-black font-medium">Lớp</Typography>
            <Select className="w-[200px]" />
          </div>
        </Col>
        <Col span={6}>
          <div className="flex items-center gap-5">
            <Typography className="text-black font-medium">Môn</Typography>
            <Select className="w-[200px]" />
          </div>
        </Col>
        <Col span={6}>
          <div className="flex items-center gap-5">
            <Typography className="text-black font-medium">Học kỳ</Typography>
            <Select className="w-[200px]" />
          </div>
        </Col>
      </Row>

      <Row className="justify-center mt-5">
        <Col span={20}>
          <Table columns={columns} dataSource={[]} />
        </Col>
      </Row>
    </div>
  );
};

export default Point;
