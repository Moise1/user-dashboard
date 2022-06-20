import { Layout, Spin } from 'antd';
import {useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getTemplates, updateTemplate } from '../../redux/templates/templatesThunk';
import { Template } from 'src/redux/templates/templatesSlice';
import { useParams } from 'react-router-dom';
import { ResetBtn, SuccessBtn } from 'src/small-components/ActionBtns';
import '../../sass/templates.scss';

interface Params{
  id: string | undefined;
}

export const EditTemplate = () => {
  const dispatch = useAppDispatch();
  const [currentTemplate, setCurrentTemplate] = useState<string>('');
  const { templates, loading } = useAppSelector((state) => state.templates);
  const params: Params = useParams();

  useEffect(() => {
    dispatch(getTemplates());
    const result = templates.find((temp: Template) => temp.id === parseInt(params.id as string));
    setCurrentTemplate(result?.html);
  }, [getTemplates, updateTemplate]);

  const handleUpdate = () => {
    dispatch(updateTemplate({html: currentTemplate}));
  };
  
  return (
    <Layout className="templates-container">
      <h1>Edit this template</h1>
      {loading ? (
        <Spin />
      ) : (
        <>
          <SunEditor setContents={currentTemplate as string} height="400"/>
          <div className="action-btns-container">
            <SuccessBtn handleConfirm={handleUpdate}>Update</SuccessBtn>
            <ResetBtn>Reset</ResetBtn>
          </div>
        </>
      )}

    </Layout>
  );
};
