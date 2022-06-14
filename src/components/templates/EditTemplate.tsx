import { Layout, Spin } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getTemplates } from '../../redux/templates/templatesThunk';
import { Template } from 'src/redux/templates/templatesSlice';

import '../../sass/templates.scss';

export const EditTemplate = () => {
  const dispatch = useAppDispatch();

  const { templates, loading } = useAppSelector((state) => state.templates as Template);

  useEffect(() => {
    dispatch(getTemplates());
  }, [getTemplates]);

  console.log(templates);

  return (
    <Layout className="templates-container">
      <h1>Templates</h1>
      {loading ? (
        <Spin />
      ) : (
        <div>
          <h2>Edit template {templates}</h2>
        </div>
      )}
    </Layout>
  );
};
