import axios from "axios";
import { deleteData, getData, saveData } from "./userKey";
import { useNavigation } from "@react-navigation/native";

const instance = axios.create({
  baseURL: "http://ec2-3-129-24-50.us-east-2.compute.amazonaws.com",
});

instance.interceptors.request.use(
  async (config) => {
    if (config.url === "/api/login/" || config.url === "/api/register/") {
      return config;
    }
    let access = await getData("access");
    if (!access || tokenExpired(access)) {
      try {
        access = await refreshToken();
      } catch (error) {
        await logOut(useNavigation());
        throw error;
      }
    }
    config.headers.Authorization = `Bearer ${access}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const tokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

export const logOut = async (navigation) => {
  await deleteData("access");
  await deleteData("refresh");
  console.log("Sesión expirada, redirigiendo al login...");
  navigation.replace("Auth");
};

const refreshToken = async () => {
  try {
    const refresh = await getData("refresh");
    if (!refresh) {
      throw new Error("No refresh token found");
    }
    const response = await instance.post("/api/token/refresh/", {
      refresh_token: refresh,
    });
    const { access } = response.data;
    await saveData("access", access);
    return access;
  } catch (error) {
    console.log("Error al refrescar el token:", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  const response = await instance.post("/api/login/", {
    username: username,
    password: password,
  });
  const { access, refresh } = response.data;
  await saveData("access", access);
  await saveData("refresh", refresh);
};

export const retrieveData = async (route) => {
  try {
    const response = await instance.get(route);
    return response.data.results;
  } catch (error) {
    console.log("Error al obtener datos:", error);
  }
};
export const fetchImages = async (route) => {
  try {
    const urlPath = route.split(".com")[1];
    const response = await instance.get(urlPath, {
      responseType: "blob",
    });
    if (response.data) {
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } else {
      console.error("La respuesta no contiene datos de imagen.");
    }
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
  }
  return null;
};
