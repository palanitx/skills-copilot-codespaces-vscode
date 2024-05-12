// create web server
const server = http.createServer((req, res) => {
      // log request
  console.log(req.method, req.url);

  // get URL path
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // get query string as object
  const query = Object.fromEntries(url.searchParams.entries());

  // get headers
  const headers = req.headers;

  // get body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  // create response
  req.on('end', () => {
    const response = {
      method: req.method,
      path,
      query,
      headers,
      body,
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response, null, 2));
  });
});

// listen on port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



