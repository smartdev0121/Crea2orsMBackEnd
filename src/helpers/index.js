import path from "path";
import config from "../config";

export function storagePath(relativePath) {
  return path.resolve(__dirname, "../../storage/", relativePath);
}

export function storageUrl(url) {
  return `${config.API_URL}/storage/${url}`;
}

export function apiUrl(url) {
  return `${config.API_URL}/${url}`;
}

export function siteUrl(url) {
  return `${config.FRONT_URL}/${url}`;
}

export function replaceParams(content, data = {}) {
  if (!content) {
    return "";
  }

  let tokenStr = content;
  Object.keys(data).forEach((key) => {
    const regex = new RegExp("{" + key + "}", "g");

    tokenStr = tokenStr.replace(regex, data[key]);
  });

  return tokenStr;
}


