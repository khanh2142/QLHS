import { Col, Row, Tabs, TabsProps, Typography } from "antd";
import HomeLink from "../../components/HomeLink";
import ClassSettings from "./tabs/ClassSettings";
import GeneralSettings from "./tabs/GeneralSettings";
import SubjectSetting from "./tabs/SubjectSettings";

const Settings = () => {
  const onChange = (key: string) => {};

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Cài đặt chung`,
      children: <GeneralSettings />,
    },
    {
      key: "2",
      label: `Lớp`,
      children: <ClassSettings />,
    },
    {
      key: "3",
      label: `Môn học`,
      children: <SubjectSetting />,
    },
  ];

  return (
    <>
      <HomeLink />
      <Row className="px-12 py-20">
        <Col span={16}>
          <Typography className="text-xl font-medium">Cài đặt</Typography>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Col>
      </Row>
    </>
  );
};

export default Settings;
