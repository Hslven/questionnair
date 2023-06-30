import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_PATHNAME } from '@/router';
const Undefined: React.FC = () => {
  const nav = useNavigate()
  function jump() {
    nav(HOME_PATHNAME, { replace: true })
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={jump}>Back Home</Button>}
    />
  )
}
export default Undefined