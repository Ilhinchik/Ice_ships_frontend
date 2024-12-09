import {resolve} from 'path';

import {generateApi} from 'swagger-typescript-api';

generateApi({
    name: 'Api.ts',
    output: resolve(process.cwd(), './src/core/api'),
    url: 'http://192.168.1.120:8000/swagger/?format=openapi',
    httpClientType: 'axios',
});