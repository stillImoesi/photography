export const generateLoginUrl = (origin: string, path: string, ) => {
  const cognitorBase =
    "https://sp-photos.auth.eu-central-1.amazoncognito.com/oauth2/authorize?client_id=11lc7bascotnru1bacuo0346pu&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=";

return `${cognitorBase}${origin}${path}`;
};

export const generateLogoutUrl = (origin: string, path: string, ) => {
  const cognitorBase =
    "https://sp-photos.auth.eu-central-1.amazoncognito.com/logout?client_id=11lc7bascotnru1bacuo0346pu&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=";

return `${cognitorBase}${origin}${path}`;
};


export function getWindowCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
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
