import { useNavigate } from "@tanstack/router";
import { Card, Col, Row } from "antd";
const CustomLayout = () => {
  const listCard = [
    {
      content: "Tiếp nhận học sinh",
      link: "add-student",
    },
    {
      content: "Lập danh sách lớp",
      link: "class-management",
    },
    {
      content: "Tra cứu học sinh",
      link: "search",
    },
    {
      content: "Bảng Điểm Môn Học",
      link: "point",
    },
    {
      content: "Báo cáo tổng kết môn",
      link: "summary-subject",
    },
    {
      content: "Báo cáo tổng kết học kỳ",
      link: "summary-semester",
    },
    {
      content: "Thay đổi quy định",
      link: "settings",
    },
  ];

  const navigate: any = useNavigate();

  const navigateTo = (link: string) => navigate({ to: `/${link}` });

  return (
    <Row style={{ width: "100%" }} gutter={16}>
      {listCard.map((item) => (
        <Col span={6} style={{ marginBottom: 16 }} key={item.link}>
          <Card
            key={item.link}
            className="shadow-xl hover:bg-green-500 hover:shadow-emerald-400 ease-linear duration-150 cursor-pointer border-none"
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
            onClick={() => navigateTo(item.link)}
          >
            {item.content}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CustomLayout;
