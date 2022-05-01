import {
  getUser,
  clearToken,
  clearUser,
} from "../../shared/services/local-storage-service";
import { ROUTES } from "../../shared/constants/routes";

export class Header {
  constructor() {}
  
  static getHeaderTemplate(destination) {
    const { firstName, lastName, email } = getUser();

    const showFirstLetterOnUserImage = (userName, userImage) => {
      console.log(userName);
      console.log (userName.slice (0,1));
      userImage.innerText = `${userName.slice (0,1)}`
    };

    const header = document.createElement("div");
    const headerLogo = document.createElement("div");
    const headerTitle = document.createElement("p");
    const headerUser = document.createElement("div");
    const headerUserInfo = document.createElement("div");
    const headerUserName = document.createElement("p");
    const headerUserEmail = document.createElement("p");
    const headerUserPhoto = document.createElement("div");
    const headerFindUsersButton = document.createElement("button");
    const headerLogoutButton = document.createElement("button");

    header.classList.add("header");
    headerLogo.classList.add("header__logo");
    headerTitle.innerText = "TODO LIST";
    headerUser.classList = "header__user";
    headerUserInfo.classList.add("header__user__info");
    headerUserPhoto.classList.add("header__user__photo");
    headerFindUsersButton.innerText = "FIND USERS";
    headerLogoutButton.innerText = "LOGOUT";
    headerFindUsersButton.innerText = "FIND USERS";

    header.append(headerLogo);
    header.append(headerUser);
    headerLogo.append(headerTitle);
    headerUser.append(headerUserInfo);
    headerUser.append(headerUserPhoto);
    headerUser.append(headerFindUsersButton);
    headerUser.append(headerLogoutButton);
    headerUserInfo.append(headerUserName);
    headerUserInfo.append(headerUserEmail);

    headerLogoutButton.onclick = () => {
      clearToken();
      clearUser();
      window.location = ROUTES.sign_in;
    };

    headerFindUsersButton.onclick = () => {
      window.location = ROUTES.find_users;
    };

    headerUserEmail.innerText = email;
    headerUserName.innerText = `${firstName} ${lastName}`;
    showFirstLetterOnUserImage(firstName, headerUserPhoto);
    destination.prepend(header);
    
    return header;
  }
}
