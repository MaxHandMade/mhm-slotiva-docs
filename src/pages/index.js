import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Temporary until the landing page (plan Task 3): send visitors to the docs start, in their locale.
export default function Home() {
  return <Redirect to={useBaseUrl('/docs/intro')} />;
}
