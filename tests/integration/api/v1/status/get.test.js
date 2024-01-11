test('GET to /api/v1/status should return 200 and correct response format', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status');
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const { max_connections, opened_connections, version } =
    responseBody.dependencies.database;

  expect(typeof max_connections).toBe('number');
  expect(max_connections).toBeGreaterThan(0);

  expect(typeof opened_connections).toBe('number');
  expect(opened_connections).toBe(1);

  expect(typeof version).toBe('string');
  expect(version.length).toBeGreaterThan(0);
});
