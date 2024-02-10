import { CredentialResponse } from "@react-oauth/google";
import apiClient from "./api-client";


export enum UserRole {
  Admin = "admin",
  Owner = "owner",
  Tenant = "tenant",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles?: UserRole;
  profile_image?: string;
  _id?: string;
  accessToken?: string;
  refreshToken?: string;
  tokens?: string[];
}

export interface ILogin {
  name: string;
  email: string;
  password: string;
  rolse?: UserRole;
}

export interface UpdateOwnProfileData {
  name?: string;
  email?: string;
  password?: string;
  profile_image?: string;
}

export const registerUser = (user: IUser) => {
  return new Promise<IUser>((resolve, reject) => {
    console.log("Registering user...");
    console.log(user);
    apiClient
      .post("/auth/register", user)
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const loginUser = (user: ILogin) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>((resolve, reject) => {
    console.log("Login user...");
    console.log(user);
    apiClient
      .post("/auth/login", user)
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const googleSignin = (credentialResponse: CredentialResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>((resolve, reject) => {
    console.log("googleSignin ...");
    apiClient
      .post("/auth/google", credentialResponse)
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const refreshAccessToken = async (token: string) => {
  const abortController = new AbortController();

  try {
    const response = await apiClient.get("/auth/refresh", {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  } finally {
    abortController.abort();
  }
};

export const getUserById = async (userId: string, token: string) => {
  const abortController = new AbortController();
  try {
    const response = await apiClient.get(`/user/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { name, email, password, profile_image, roles } = response.data;
    return { name, email, password, profile_image, roles };
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  } finally {
    abortController.abort();
  }
};



export const updateOwnProfile = async (
  data: UpdateOwnProfileData,
  token: string
): Promise<void> => {
  try {
    const response = await apiClient.patch("/user/updateOwnProfile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Profile updated successfully");
    } else {
      console.error("Failed to update profile:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const checkOldPassword = async (
  oldPassword: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await apiClient.post(
      "/user/checkOldPassword",
      { oldPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const isValid = response.data.isValid
    if (isValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking old password:", error);
    throw new Error("Internal Server Error");
  }
};
