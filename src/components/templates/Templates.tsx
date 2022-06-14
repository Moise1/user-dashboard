import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getTemplates, setDefault } from '../../redux/templates/templatesThunk';
import { Template } from 'src/redux/templates/templatesSlice';
import { DataTable } from '../tables/DataTable';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { EditOutlined } from '@ant-design/icons';
import '../../sass/templates.scss';
import { Link } from 'react-router-dom';
import { Links } from '../../links';

export const Templates = () => {
  const dispatch = useAppDispatch();
  const [current] = useState<number>(1);

  function parentToChild(value: string): void {
    localStorage.setItem('EditTemplate', value);
  }

  const updateStatus = async (id: Template['id'], active: Template['isDefault']) => {
    await dispatch(setDefault({ id, active: !active }));
    dispatch(getTemplates());
  };

  const { templates, loading } = useAppSelector((state) => state.templates as Template);

  useEffect(() => {
    dispatch(getTemplates());
  }, [getTemplates]);

  console.log(templates);

  const tableColumns = [
    {
      title: 'Template',
      dataIndex: 'name',
      key: 'name',
      render: (value: string, record: Template) =>
        value ? (
          <div className="template-name">
            <h4>{record.name}</h4>
          </div>
        ) : (
          ''
        )
    },
    {
      title: 'Defaul template',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (value: boolean, record: Template) =>
        value ? (
          <div className="default-template">
            <h4 className="default">Default</h4>
          </div>
        ) : (
          <div className="default-template">
            <h4 className="not-default" onClick={() => updateStatus(record.id, record.isDefault)}>
              Set as default
            </h4>
          </div>
        )
    },
    {
      title: 'Edit template',
      dataIndex: 'id',
      key: 'id',
      render: (value: string) => (
        <Link to={Links.EditTemplate} onClick={() => parentToChild(value)} className="edit-template">
          <h4>
            Edit template <EditOutlined />
          </h4>
        </Link>
      )
    }
  ];

  const [columns, setColumns] = useState(tableColumns);

  const handleCheckBox = (e: CheckboxChangeEvent): void => {
    const cloneColumns = columns.map((col) => {
      if (col.key === e.target.value) {
        return { ...col, visible: e.target.checked };
      } else {
        return col;
      }
    });
    setColumns(cloneColumns);
  };

  console.log(handleCheckBox);

  return (
    <Layout className="templates-container">
      <h1>Templates</h1>
      {loading ? (
        <Spin />
      ) : (
        <DataTable
          dataSource={templates}
          columns={columns}
          pageSize={10}
          current={current}
          totalItems={templates.length}
        />
      )}
    </Layout>
  );
};
