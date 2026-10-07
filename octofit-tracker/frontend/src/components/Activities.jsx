import { useEffect, useState } from 'react';
import { apiBase, normalizeResourceResponse } from '../api';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(`${apiBase}/api/activities/`)
      .then((response) => response.json())
      .then((payload) => {
        if (!ignore) {
          setItems(normalizeResourceResponse(payload));
        }
      })
      .catch(() => {
        if (!ignore) {
          setError('Unable to load activities.');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ul className="list-group list-group-flush">
            {items.map((item, index) => (
              <li key={item.id ?? item._id ?? `${item.name}-${index}`} className="list-group-item">
                <strong>{item.name ?? 'Activity'}</strong>
                <div>Duration: {item.duration ?? '—'} mins</div>
                <div>Calories: {item.calories ?? '—'}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
