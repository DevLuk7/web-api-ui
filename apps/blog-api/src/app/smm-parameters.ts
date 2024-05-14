import { GetParametersCommand, SSMClient } from '@aws-sdk/client-ssm';

export const getSSMParameters = async (parameters: string[]) => {
  let environment = process.env.NODE_ENV || 'dev';
  if (environment !== 'prod') {
    environment = 'dev';
  }

  const client = new SSMClient({ region: 'eu-north-1' });

  const command = new GetParametersCommand({
    Names: parameters.map((name) => `/blog-api/${environment}/${name}`),
    WithDecryption: true,
  });

  const response = await client.send(command);

  const config = {};

  response.Parameters.forEach((param) => {
    const key = param.Name.split('/').pop();
    config[key] = param.Value;
  });

  return config;
};
