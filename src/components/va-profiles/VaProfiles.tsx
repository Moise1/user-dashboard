import { Table, Row, Col, Card, Input, Form, Button } from 'antd';
import '../../sass/light-theme/va-profiles.scss';
import { Layout } from 'antd';

export const VaProfiles = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Dani',
      status: <button className="status-btn">Disabled</button>
    },
    {
      key: '2',
      name: 'Joost',
      status: <button className="status-btn enabled">Enabled</button>
    }
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  return (
    <Layout className="va-profiles-container">
      <Row className="row" gutter={[32, { xs: 16, lg: 0 }]}>
        <Col xs={24} xl={8} md={12} className="table-container">
          <Table dataSource={dataSource} columns={columns}></Table>
        </Col>
        <Col xs={24} xl={8} md={12} className="form-container">
          <Card className="card">
            <Form className="form">
              <p>Add new VA Profile</p>
              <Input placeholder="Enter a name..." className="input" />
              <Button className="btn">Add Profile</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
