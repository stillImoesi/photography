import { parse } from "parse-multipart-data";

export const generateLoginUrl = (origin: string, path: string) => {
  const cognitorBase =
    "https://sp-photos.auth.eu-central-1.amazoncognito.com/oauth2/authorize?client_id=11lc7bascotnru1bacuo0346pu&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=";

  return `${cognitorBase}${origin}${path}`;
};

export const generateLogoutUrl = (origin: string, path: string) => {
  const cognitorBase =
    "https://sp-photos.auth.eu-central-1.amazoncognito.com/logout?client_id=11lc7bascotnru1bacuo0346pu&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=";

  return `${cognitorBase}${origin}${path}`;
};

export function getWindowCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function getPaginatedChunk<T>(array: T[], pageNumber: number): T[] {
  const itemsPerPage = 20;
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return array.slice(startIndex, endIndex);
}

export function addDays(date) {
  let result = new Date(date);
  result.setDate(result.getDate() + 30);
  return result;
}

export function generateRandomPassword(length = 6) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

export async function readStreamToEnd(stream) {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();

  let done, value: Uint8Array;
  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      chunks.push(value);
    }
  }
  return Buffer.concat(chunks);
}

export const parseForm = (body: Buffer, contentType: string) => {
  const boundary = contentType.split("boundary=")[1];

  const fields = {} as any;
  const files = [] as any;

  const parts = parse(body, boundary) as any;

  for (const part of parts) {
    if (part.type?.includes("image")) {
      files.push({
        name: part.filename,
        type: part?.headers?.["content-type"],
        buffer: part.data,
      });
    } else {
      fields[part.name] = part.data.toString();
    }
  }
  return {
    fields,
    files,
  };
};

export const returnAwsCredentials = () => {
  return {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  };
}
