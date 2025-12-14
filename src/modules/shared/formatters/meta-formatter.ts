export function formatMeta(meta: any): any {
  if (!meta) return meta;
  const formattedMeta = JSON.parse(JSON.stringify(meta));

  if (formattedMeta.stack && typeof formattedMeta.stack === 'string') {
    formattedMeta.stack = formattedMeta.stack
      .split('\n')
      .map((line: string) => line.trim());
  }

  return formattedMeta;
}
