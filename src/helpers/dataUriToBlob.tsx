export default function dataUriToBlob(dataUri: string): Blob | null {
  // Split the Data URI into parts: "data:[<mediatype>][;base64],<data>"
  const parts = dataUri.match(/^data:([^;]+)(;base64)?,(.*)$/);

  if (!parts || parts.length !== 4) {
    // Invalid Data URI format
    return null;
  }

  const [, mediaType, base64, data] = parts;

  // Determine whether the Data URI is base64-encoded or not
  const isBase64 = base64 === ";base64";

  // Decode the data if it's base64-encoded
  const byteString = isBase64 ? atob(data) : decodeURIComponent(data);

  // Create a Uint8Array from the byte string
  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  return new Blob([byteArray], { type: mediaType });
}
