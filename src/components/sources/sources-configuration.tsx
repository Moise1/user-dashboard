import { useParams } from 'react-router';
import { SourceSettings } from './configuration/source-settings';
import { SourcesTable } from './configuration/sources-table';

export const SourcesConfiguration = () => {
  const { id: selectedSource } = useParams<{ id?: string }>();
  const soruceId = parseInt(selectedSource ?? '');

  if (selectedSource != undefined && !isNaN(soruceId)) {
    return <SourceSettings sourceId={soruceId} />;
  }
  return <SourcesTable />;

};