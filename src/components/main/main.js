import {
  getUser,
  clearUser,
  clearToken,
} from "../../shared/services/local-storage-service";
import { getTodos } from "../../api/api-handlers";
import { Todo } from "../todo/todo";
import { ROUTES } from "../../shared/constants/routes";
import { Header } from "../header/header";

export const mainPageHandler = async () => {
  const mainTag = document.querySelector(".main");
  Header.getHeaderTemplate(mainTag)
  const todosWrapper = document.querySelector(".main__todos");
  let todos = [];

  await getTodos().then((todosArr) => {
    todos = Object.keys(todosArr).map((key) => {
      const todo = { id: key, ...todosArr[key] };

      todosWrapper.append(new Todo(todo).getTodo());
      return todo;
    });
  });
};
