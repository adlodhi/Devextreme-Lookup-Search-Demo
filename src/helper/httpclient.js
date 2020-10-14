import axios from "axios";

axios.defaults.withCredentials = true;

export function httpRequest(url, method = "Get", data = {}, options) {
  console.log("OPTIONS", options);
  if (method === "Get" && isNotEmpty(options)) {
    let optionsParams = "?";
    ["skip", "take", "requireTotalCount", "requireGroupCount", "sort", "filter", "totalSummary", "group", "groupSummary", "search"].forEach(function (
      i
    ) {
      if (i in options && isNotEmpty(options[i])) {
        optionsParams += `${i}=${JSON.stringify(options[i])}&`;
      }
    });
    optionsParams = optionsParams.slice(0, -1);
    url = `${url}/${optionsParams}`;
  }

  return axios({
    method: method,
    url: url,
    data: data,
    withCredentials: true,
  })
    .then((response) => {
      const result = response.data;
      if (options) {
        return {
          data: result.data,
          totalCount: result.totalCount,
          summary: result.summary,
          groupCount: result.groupCount,
        };
      } else {
        return result;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw Error(error.response.data);
      } else if (error.request) {
        throw Error(error.request);
      } else {
        throw Error(error.message);
      }
    });
}

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
