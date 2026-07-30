import { notFound } from 'next/navigation';
import OperationsCrudPage from '@/components/OperationsCrudPage';
import { isOperationResource } from '@/lib/operations-config';
import { operationPages } from '@/lib/operations-ui';

export default function OperationResourcePage({
  params,
}: {
  params: { resource: string };
}) {
  if (!isOperationResource(params.resource)) notFound();
  return <OperationsCrudPage definition={operationPages[params.resource]} />;
}
