import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getTemplates, updateTemplate } from '../../redux/templates/templatesThunk';
import { Template } from 'src/redux/templates/templatesSlice';
import { SuccessBtn } from 'src/small-components/ActionBtns';
import '../../sass/templates.scss';

interface Params {
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
    dispatch(
      updateTemplate({
        id: parseInt(params.id!),
        html: currentTemplate
      })
    );
  };

  return (
    <Layout className="templates-container">
      <h1>Edit this template</h1>
      {loading ? (
        <Spin />
      ) : (
        <>
          <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
            initData={currentTemplate}
            config={{
              height: 420,
              allowedContent: true
            }}
            onChange={({ editor }) => {
              setCurrentTemplate(editor.getData());
            }}
          />
          <div className="action-btns-container">
            <SuccessBtn handleConfirm={handleUpdate}>Update</SuccessBtn>
          </div>
        </>
      )}
    </Layout>
  );
};