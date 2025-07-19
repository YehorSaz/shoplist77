import api from "../api";
import {urls} from "../constants/urls";
import {IUser} from "../interfaces/user.interface";


export const userService = {
    getMe: () => api.get<IUser>(urls.users.me),
}
