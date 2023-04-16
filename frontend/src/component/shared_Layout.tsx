import { Col, Layout, Row } from "antd";

interface Props {
  children: React.ReactNode;
  text1: string;
  text2: string;
}

export default function Shared({ children, text1, text2 }: Props) {
  return (
    <Layout className='layout'>
      <Row style={{ height: '85vh', alignItems: 'center' }}>
        <Col
          xs={{
            span: 22,
            offset: 1,
          }}
          md={{
            span: 8,
            offset: 8,
          }}
        >
          <h1 className='text-center'>{text1}</h1>
          <h3 className='text-center'>{text2}</h3>

          {children}
        </Col>
      </Row>
    </Layout>
  );
}
