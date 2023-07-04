import { XCircleIcon } from "@heroicons/react/24/outline";
import * as keys from "../config/keys";
import { useNotifications } from "../services/notifications";
const apiURL = `${keys.CLIENT_HOME_PAGE_URL}/api/flags/`;

export async function fetchGet(pathURL: string, config?: any) {
  let url = pathURL;
  if (!url.startsWith("http")) {
    url = new URL(pathURL, apiURL).toString();
  }

  const headers = {
    ...config?.headers,
    "content-type": "application/json",
  };

  const useAuth = config?.auth ?? true;
  if (useAuth) {
    // const idToken = await auth.getIdToken()
    // headers['Authorization'] = `Bearer ${idToken}`
  }

  const params = config?.params ?? {};
  const urlFinal = new URL(url);
  Object.keys(params).forEach((key) =>
    urlFinal.searchParams.append(key, params[key])
  );
  const response = await fetch(urlFinal, {
    method: "GET",
    headers: headers,
  });
  const contentType = response.headers.get("content-type");
  // read content-type
  let data = null;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const e = new Error(`HTTP error: ${response.status}`) as any;
    e.status = response.status;
    e.statusText = response.statusText;
    e.response = response;
    e.message = data.message;
    e.code = data.code || data.status;
    throw e;
  }

  return data;
}

export async function fetchPost(
  pathURL: string,
  requestBody?: any,
  config?: any
) {
  let url = pathURL;
  if (!url.startsWith("http")) {
    url = new URL(pathURL, apiURL).toString();
  }

  const headers = {
    ...config?.headers,
    "content-type": "application/json",
  };

  const useAuth = config?.auth ?? true;
  if (useAuth) {
    // const idToken = await auth.getIdToken()
    // headers['Authorization'] = `Bearer ${idToken}`
  }

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: headers,
  });

  if (!response.ok) {
    const e = new Error(`HTTP error: ${response.status}`) as any;
    e.status = response.status;
    e.statusText = response.statusText;
    e.response = response;
    if (response.headers.get("content-type")?.includes("application/json")) {
      const json = await response.json();
      e.json = json;
      e.message = json.message;
      e.status = json.status;
    } else {
      e.message = await response.text();
    }
    throw e;
  }

  // read content-type
  const contentType = response.headers.get("content-type");
  let data = null;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  return data;
}

export const useAPI = () => {
  const notifications = useNotifications();

  const handleError = (e: any) => {
    let title = e.statusText || "Error";
    if (e.response?.status === 401) {
      title = "Authentication failed";
    }

    let description = e.message;
    if (e.json?.message) {
      description = e.json.message;
    }

    notifications.addNotification({
      icon: <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />,
      title: title,
      description,
    });
    console.error({ ...e });
    return e;
  };

  const post = async (pathURL: string, requestBody?: any, config?: any) => {
    try {
      await fetchPost(pathURL, requestBody, config);
    } catch (e: any) {
      throw handleError(e);
    }
  };

  return {
    post,
  };
};
