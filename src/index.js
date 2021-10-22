const http = require('http');

// factory
const { generateInstance } = require('./factories/heroFactory');

// default variables
const PORT = 3000;
const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

// erros
const handleError = (response) => {
  return (error) => {
    response.writeHead(error.status, DEFAULT_HEADER);
    response.write(JSON.stringify(error));
    response.end();
  };
};

function parseRouter(url, method) {
  const completeUrl = url.split('/');

  const param = completeUrl.find((element) => element && !isNaN(element));

  const route = param
    ? completeUrl.slice(1, -1).join('/')
    : completeUrl.slice(1).join('/');

  let key = '';
  const methodLowerCase = method.toLowerCase();

  param
    ? (key = `${methodLowerCase} - /${route}/:id`)
    : (key = `${methodLowerCase} - /${route}`);

  return { route: key, param };
}

const routes = {
  'post - /heroes': async (request, response) => {
    for await (const data of request) {
      try {
        const item = JSON.parse(data);

        const result = await generateInstance().create(item);

        response.write(JSON.stringify(result));
        response.end();
      } catch (error) {
        return handleError(response)(error)
      }
    }
  },

  'get - /heroes': async (request, response) => {
    const heros = await generateInstance().find();

    response.write(JSON.stringify(heros));
    return response.end();
  },

  'get - /heroes/:id': async (request, response) => {
    const { id } = request.queryString;
    const hero = await generateInstance().findByID(id);

    response.write(JSON.stringify(hero));
    return response.end();
  },

  default: (request, response) => {
    response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;

  // get URL
  const { route: key, param } = parseRouter(url, method);

  // set param
  if (param) {
    request.queryString = { id: isNaN(param) ? param : Number(param) };
  }

  // set default headers
  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;
  return chosen(request, response);
};

http
  .createServer(handler)
  .listen(PORT, () => console.log(`Server running on port: ${PORT}`));
