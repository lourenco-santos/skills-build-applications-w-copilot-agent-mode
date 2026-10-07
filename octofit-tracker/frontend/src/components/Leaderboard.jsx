import { useEffect, useState } from 'react';
import { apiBase, normalizeResourceResponse } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(`${apiBase}/api/leaderboard/`)
      .then((response) => response.json())
      .then((payload) => {
        if (!ignore) {
          setItems(normalizeResourceResponse(payload));
        }
      })
      .catch(() => {
        if (!ignore) {
          setError('Unable to load leaderboard.');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ul className="list-group list-group-flush">
            {items.map((item, index) => (
              <li key={item.id ?? item._id ?? `${item.user}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>#{item.rank ?? index + 1}</strong> {item.user ?? 'User'}
                </span>
                <span className="badge bg-primary rounded-pill">{item.score ?? 0}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
