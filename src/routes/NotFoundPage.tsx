import { lang } from '../data/lang';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle(lang.metadata.CustomTitle.replace('{page}', lang.features.NotFoundPage));
  return (
    <div className="not-found">
      <h1>404 — Not Found</h1>
      <p>The page you requested does not exist</p>
    </div>
  );
}
