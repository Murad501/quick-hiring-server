export function getUniqueKey(prefix: string): string {
  const timestamp = new Date().getTime();
  const toStingTimestamp = `${timestamp}`.slice(3, 13);
  const uniqueIdentifier = Math.floor(Math.random() * 1000);

  return `${prefix
    .slice(0, 3)
    .toUpperCase()}${uniqueIdentifier}${toStingTimestamp}`;
}
