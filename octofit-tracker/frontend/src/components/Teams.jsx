import { useEffect, useState } from 'react';
import { apiBase, normalizeResourceResponse } from '../api';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(`${apiBase}/api/teams/`)
      .then((response) => response.json())
      .then((payload) => {
        if (!ignore) {
          setItems(normalizeResourceResponse(payload));
        }
      })
      .catch(() => {
        if (!ignore) {
          setError('Unable to load teams.');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ul className="list-group list-group-flush">
            {items.map((item, index) => (
              <li key={item.id ?? item._id ?? `${item.name}-${index}`} className="list-group-item">
                <strong>{item.name ?? 'Team'}</strong>
                <div>Members: {item.members?.length ?? 0}</div>
                <div>Points: {item.points ?? 0}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
