export default class UserInfo {
  constructor({ profileName, profileJob, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const userValue = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
      avatar: this._profileAvatar.src,
    };
    return userValue;
  }

  // получаем данные пользователя

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._profileName.textContent = name;
    }
    if (about) {
      this._profileJob.textContent = about;
    }
    if (avatar) {
      this._profileAvatar.src = avatar;
    }
  }
}
