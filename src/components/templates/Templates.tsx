import { Layout } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import { getTemplates } from '../../redux/templates/templatesThunk';
import { DataTable } from '../tables/DataTable';

export const Templates = () => {
  const tableColumns = [
    {
      title: 'Template name',
      dataIndex: 'name',
      key: '1',
      visible: true
    },
    {
      title: 'Defaul template',
      dataIndex: 'default',
      key: '2',
      visible: true
    },
    {
      title: 'Edit template',
      dataIndex: 'edit',
      key: '3',
      visible: false
    }
  ];

  const dispatch = useAppDispatch();
  // const {templates} = useAppSelector((state) => state.templates);

  useEffect(() => {
    dispatch(getTemplates());
  }, [getTemplates]);

  return (
    <Layout className="templates-container">
      <h1>Templates</h1>
      {sourcesLoading ? (
        <Spin />
      ) : (
        <DataTable
          dataSource={rules}
          columns={columns}
          pageSize={10}
          current={current}
          totalItems={rules.length}
          rowSelection={rowSelection}
          selectedRows={selectedRowKeys.length}
        />
      )}
    </Layout>
  );
};
