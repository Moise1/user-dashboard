import { useEffect } from 'react';
import { Table, Row, Col, Card, Input, Form, Button, Layout, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getUserAssistants } from 'src/redux/va-profiles/vaProfilesThunk';
import '../../sass/va-profiles.scss';

export const VaProfiles = () => {
  const dispatch = useAppDispatch();
  const { userAssistants, loading } = useAppSelector((state) => state.vaProfiles);

  useEffect(() => {
    dispatch(getUserAssistants());
  }, [getUserAssistants]);


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
      {loading ? (
        <Spin />
      ) : (
        <Row className="row" gutter={[32, { xs: 16, lg: 0 }]}>
          <Col xs={24} xl={8} md={12} className="table-container">
            <Table dataSource={userAssistants} columns={columns}></Table>
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
      )}
    </Layout>
  );
};
