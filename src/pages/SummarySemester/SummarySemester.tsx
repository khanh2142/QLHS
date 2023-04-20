import { Col, Row, Select, Table, Typography } from "antd";
import HomeLink from "../../components/HomeLink";

const SummarySemester = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      width: 50,
    },
    {
      title: "Lớp",
      dataIndex: "age",
      key: "age",
      width: 150,
    },
    {
      title: "Sĩ số",
      dataIndex: "address",
      key: "address",
      width: 120,
    },

    {
      title: "Số lượng đạt",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
    {
      title: "Tỉ lệ",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
  ];

  return (
    <div>
      <HomeLink />
      <div className="text-center p-12 text-2xl font-medium">
        Báo cáo tổng kết học kỳ
      </div>
      <Row className="">
        <Col span={6} offset={10}>
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

export default SummarySemester;
