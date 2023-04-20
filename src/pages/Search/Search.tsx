import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Table, Typography } from "antd";
import HomeLink from "../../components/HomeLink";

const Search = () => {
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
      title: "Lớp",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      title: "Trung bình HK 1",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
    {
      title: "Trung bình HK 2",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
  ];

  return (
    <div>
      <HomeLink />
      <div className="text-center p-12 text-2xl font-medium">
        Danh Sách Học sinh
      </div>
      <Row className="justify-center">
        <Col span={8}>
          <div className="flex items-center gap-5">
            <Typography className="text-black font-medium">
              Tên học sinh
            </Typography>
            <Input className="w-[300px]" />
          </div>
        </Col>
        <Col span={6}>
          <div className="flex items-center gap-5">
            <Typography className="text-black font-medium">Lớp</Typography>
            <Select className="w-[200px]" />
          </div>
        </Col>
        <Col span={2}>
          <Button className="flex items-center">
            <SearchOutlined style={{ fontSize: 20 }} />
          </Button>
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

export default Search;
