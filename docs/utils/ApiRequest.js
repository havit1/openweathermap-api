export class ApiRequest {
  static create(url, options = {}) {
    return new ApiRequest(url, options);
  }

  constructor(url, options) {
    this.url = url;
    this.options = options;
  }

  get(onSuccess, onError) {
    const appid = this.options.APPID;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url);
    if (appid) {
      xhr.setRequestHeader("APPID", `${appid}`);
    }
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onSuccess(JSON.parse(xhr.response));
        } else {
          onError(xhr);
        }
      }
    };
  }
}
