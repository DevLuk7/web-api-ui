const fs = require('fs');

async function createFile() {
  const response = await fetch('https://webapi-api-app.azurewebsites.net/api/Post');
  const posts = await response.json();
  fs.writeFileSync('apps/blog/routes.txt', posts.map((x: any) => `/post/${x.id}`).join('\n'));
}

// createFile();
