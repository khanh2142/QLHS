import { Link } from "@tanstack/router";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const HomeLink = () => {
  return (
    <div>
      <Link
        className="bg-cyan-400 px-6 py-2 flex items-center justify-center gap-2 fixed left-[20px] top-[20px]"
        to="/"
      >
        <ArrowLeftOutlined />
        <Typography>Trở lại</Typography>
      </Link>
    </div>
  );
};

export default HomeLink;
