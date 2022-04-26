import { useEffect } from 'react';
import { Row, Col, Card, Input, Form, Layout, Spin, Popconfirm } from 'antd';
import { DataTable } from '../tables/DataTable';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getUserAssistants, createUserAssistant, deleteUserAssistant } from 'src/redux/va-profiles/vaProfilesThunk';
import { UserAssistant } from '../../redux/va-profiles/vaProfilesSlice';
import { CloseIcon }   from  '../../small-components/CloseIcon';
import '../../sass/va-profiles.scss';



export const VaProfiles = () => {
  const dispatch = useAppDispatch();
  const { userAssistants, loading } = useAppSelector((state) => state.vaProfiles);

  useEffect(() => {
    dispatch(getUserAssistants());
  }, [getUserAssistants]);

  const onFinish = async(values: UserAssistant['name']) => {
    await dispatch(createUserAssistant({ name: values }));
    dispatch(getUserAssistants());
  };
  const removeRecord = async(id: UserAssistant['id']) => {
    await dispatch(deleteUserAssistant({id, active: false}));
    dispatch(getUserAssistants());
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (value: boolean) => value ? 'Active' : 'Inactive'
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: '',
      render: (record: UserAssistant) => {
        return (
          <Popconfirm 
            title="Sure to delete this record?"
            onConfirm={() => removeRecord(record.id)}>
            <CloseIcon className="remove-rule" />
          </Popconfirm>
        );
      }
    }
  ];


  return (
    <Layout className="va-profiles-container">
      {loading ? (
        <Spin />
      ) : (
        <Row className="row" gutter={[32, { xs: 16, lg: 0 }]}>
          <Col xs={24} xl={8} md={12} className="table-container">
            <DataTable 
              dataSource={userAssistants} 
              columns={columns} 
              pageSize={4}
              total={userAssistants.length}
            />
          </Col>
          <Col xs={24} xl={8} md={12} className="form-container">
            <Card className="card">
              <Form className="form" onFinish={onFinish}>
                <p>Add new VA Profile</p>
                <Form.Item name="name">
                  <Input placeholder="Enter a name..." className="input" />
                </Form.Item>
                <ConfirmBtn htmlType="submit">Add Profile</ConfirmBtn>
              </Form>
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
};
