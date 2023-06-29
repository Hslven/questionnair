import { Link } from "react-router-dom";
import { FormOutlined } from "@ant-design/icons";
import { Typography } from "antd";
const { Title } = Typography;

interface TitleComponentProps {
  color?: string;
  style?: React.CSSProperties;
  level?: 1 | 2 | 3 | 4;
}
// interface TitleComponentProps {
//   [key: string]: any;
// }
const TitleComponent: React.FC<TitleComponentProps> = (props) => {
  return (
    <>
      <Title level={props.level || 4}>
        <Link to="/" style={props.style}>
          <FormOutlined />
          艾卡问卷
        </Link>
      </Title>
    </>
  );
};
export default TitleComponent;
