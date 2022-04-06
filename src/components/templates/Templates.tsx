import {useEffect} from 'react';
import {useAppDispatch} from '../../custom-hooks/reduxCustomHooks';
import {getTemplates} from '../../redux/templates/templatesThunk';

export const Templates = () => {

  const dispatch = useAppDispatch();
  // const {templates} = useAppSelector((state) => state.templates);

  useEffect(() => {
    dispatch(getTemplates());
  },[getTemplates]);

  return (
    <div>Templates</div>
  );
};