export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo(username, job) {
    this._profileName.textContent = username;
    this._profileJob.textContent = job;
  }
}
