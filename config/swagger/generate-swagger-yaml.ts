import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'path';
import * as yaml from 'js-yaml';

export async function generateSwaggerYaml(app: any): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('The Home Library Service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const docsDir = join(process.cwd(), 'doc');
  if (!docsDir) {
    await mkdir(docsDir, { recursive: true });
  }

  const yamlString = yaml.dump(document, {
    skipInvalid: true,
    noRefs: true,
    lineWidth: -1,
  });

  await writeFile(join(docsDir, 'api.yaml'), yamlString, 'utf8');
}