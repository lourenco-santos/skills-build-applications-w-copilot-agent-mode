function resolveApiBase() {
  const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (configuredCodespaceName) {
    return `https://${configuredCodespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname.endsWith('.app.github.dev')) {
      const codespaceHost = hostname.replace(/-5173$/, '');
      if (codespaceHost !== hostname) {
        return `https://${codespaceHost.replace(/-5173$/, '')}-8000.app.github.dev`;
      }

      const codespaceName = hostname.replace(/\.app\.github\.dev$/, '').replace(/-\d+$/, '');
      if (codespaceName && codespaceName !== hostname) {
        return `https://${codespaceName}-8000.app.github.dev`;
      }
    }
  }

  return 'http://localhost:8000';
}

export const apiBase = resolveApiBase();

export function normalizeResourceResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = [payload.results, payload.items, payload.data, payload.records];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}
