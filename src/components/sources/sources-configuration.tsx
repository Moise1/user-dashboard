import { useParams } from 'react-router';
import { SourceSettings } from './configuration/source-settings';
import { SourcesTable } from './configuration/sources-table';

export const SourcesConfiguration = () => {
  const { id: selectedSource } = useParams<{ id?: string }>();

  if (selectedSource != undefined) {
    return <SourceSettings />;
  }
  return <SourcesTable />;

};