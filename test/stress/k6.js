import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 250 },
    { duration: '1m30s', target: 125 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const user = {
    firstName: (Math.random() + 1).toString(36).substring(2),
    lastName: (Math.random() + 1).toString(36).substring(2),
    email: (Math.random() + 1).toString(36).substring(2),
  };
  const result = http.post(
    'http://app-dod-belem-svc.dod/users',
    JSON.stringify(user),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  check(result, {
    'http response status code is 200': result.status === 200,
  });
}
