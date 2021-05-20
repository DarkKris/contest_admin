const timeoutLimit = 30 * 1000; // 30s超时

export default async function (url, method = "GET", data = {}, headers = {}) {
  // 格式化请求方法
  method = method.toUpperCase();

  const requestConfig = {
    credientials: "include",
    method,
    headers: Object.assign({
      Accept: "application/json",
      "Content-Type": "application/json",
      Charset: "utf-8",
    }, headers),
    mode: "cors",
  };

  if (method === "GET") {
    let firstFlag = true;
    Object.keys(data).forEach((key) => {
      if (firstFlag) {
        url += "?";
        firstFlag = false;
      } else {
        url += "&";
      }
      url += `${key}=${data[key]}`;
    });
  } else {
    // 仅POST请求附带数据
    if (data instanceof FormData) {
      delete requestConfig.headers["Content-Type"];
      Object.defineProperty(requestConfig, "body", {
        value: data,
      });
    } else {
      Object.defineProperty(requestConfig, "body", {
        value: JSON.stringify(data),
      });
    }
  }

  const timeoutFunc = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const retJson = {
          status: 408,
          message: "Request timeout",
          data: null
        };

        resolve(
          new Response(JSON.stringify(retJson), {
            ok: false,
            status: 408,
            url: url
          })
        )
      }, timeoutLimit);
    });
  };

  const fetchFunc = () => {
    return fetch(url, requestConfig)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        const retJson = {
          status: 500,
          message: `System error: ${error}`
        };

        return new Response(JSON.stringify(retJson), {
          ok: false,
          status: 500,
          url: url
        });
      });
  };

  return Promise.race([fetchFunc(), timeoutFunc()])
    .then(response => response.json())
    .catch(error => new Response({
      status: -1,
      message: `System error: ${error}`
    }, {
      ok: false,
      status: 500,
      url
    }));
}