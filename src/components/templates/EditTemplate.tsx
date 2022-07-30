import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getTemplates, updateTemplate } from '../../redux/templates/templatesThunk';
import { Template } from 'src/redux/templates/templatesSlice';
import { useParams } from 'react-router-dom';
import { ResetBtn, SuccessBtn } from 'src/small-components/ActionBtns';
import '../../sass/templates.scss';

interface Params {
  id: string | undefined;
}

export const EditTemplate = () => {
  const dispatch = useAppDispatch();
  const [currentTemplate, setCurrentTemplate] = useState<string>('');
  const { templates, loading } = useAppSelector((state) => state.templates);
  const params: Params = useParams();

  const htmlDoc = (content: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
  </head>
  <body>
  ${content}
  </body>
</html>`;
  };
  useEffect(() => {
    dispatch(getTemplates());
    const result = templates.find((temp: Template) => temp.id === parseInt(params.id as string));
    setCurrentTemplate(result?.html);
  }, [getTemplates, updateTemplate]);

  const handleChange = (content: string) => setCurrentTemplate(content);

  const handleUpdate = () => {
    // const formattedResult = currentTemplate
    //   .replace(/<!--[\s\S]*?-->/gm, '') // comments
    //   .replace(/\s+/g, '') // leading and trailing whitespace
    //   .replace(/\r|\n/g, ''); // trailing newlines
    dispatch(
      updateTemplate({
        html: htmlDoc(currentTemplate).trim(),  
        id: parseInt(params.id!)
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
          <SunEditor setContents={currentTemplate as string} onChange={handleChange} height="400" />
          <div className="action-btns-container">
            <SuccessBtn handleConfirm={handleUpdate}>Update</SuccessBtn>
            <ResetBtn>Reset</ResetBtn>
          </div>
        </>
      )}
    </Layout>
  );
};
