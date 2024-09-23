export const byteConverter = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
  if (bytes < 1099511627776) return (bytes / 1073741824).toFixed(1) + " GB";
  return bytes;
};
