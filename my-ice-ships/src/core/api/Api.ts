/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Icebreaker {
  /** ID */
  id?: number;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Moderator */
  moderator?: string;
  /**
   * Дата проводки
   * @format date
   */
  date?: string | null;
  /**
   * Начальная точка проводки
   * @maxLength 255
   */
  start_point?: string | null;
  /**
   * Конечная точка проводки
   * @maxLength 255
   */
  finish_point?: string | null;
  /** Результат проводки (0/1) */
  result?: boolean | null;
  /** Status */
  status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  /** Owner */
  owner?: string;
}

export interface ShipForIcebreaker {
  /** ID */
  id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 255
   */
  ship_name: string;
  /**
   * Ice_class
   * @minLength 1
   * @maxLength 255
   */
  ice_class: string;
  /**
   * Length
   * @min -2147483648
   * @max 2147483647
   */
  length: number;
  /**
   * Logo file path
   * @minLength 1
   * @maxLength 255
   */
  image?: string;
}

export interface Related {
  ship: ShipForIcebreaker;
  /**
   * Order
   * @min -2147483648
   * @max 2147483647
   */
  order: number;
}

export interface FullIcebreaker {
  /** ID */
  id?: number;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Модератор */
  moderator?: number | null;
  /**
   * Дата проводки
   * @format date
   */
  date?: string | null;
  /**
   * Начальная точка проводки
   * @maxLength 255
   */
  start_point?: string | null;
  /**
   * Конечная точка проводки
   * @maxLength 255
   */
  finish_point?: string | null;
  /** Результат проводки (0/1) */
  result?: boolean | null;
  /** Status */
  status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  /** Пользователь */
  owner?: number;
  /** Ship list */
  ship_list?: Related[];
}

export interface PutIcebreaker {
  /** ID */
  id?: number;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Модератор */
  moderator?: number | null;
  /**
   * Дата проводки
   * @format date
   */
  date?: string | null;
  /**
   * Начальная точка проводки
   * @minLength 1
   */
  start_point?: string | null;
  /**
   * Конечная точка проводки
   * @minLength 1
   */
  finish_point?: string | null;
  /** Результат проводки (0/1) */
  result?: boolean | null;
  /** Status */
  status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  /** Пользователь */
  owner?: number;
}

export interface UpdateShipIcebreaker {
  direction: "up" | "down";
  /**
   * Порядок
   * @min -2147483648
   * @max 2147483647
   */
  order?: number | null;
}

export interface ShipIcebreaker {
  /** Проводка */
  icebreaker?: number;
  /** Корабль */
  ship?: number;
  /**
   * Порядок
   * @min -2147483648
   * @max 2147483647
   */
  order?: number | null;
}

export interface ResolveIcebreaker {
  /** ID */
  id?: number;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Модератор */
  moderator?: number | null;
  /**
   * Дата проводки
   * @format date
   */
  date?: string | null;
  /**
   * Начальная точка проводки
   * @minLength 1
   */
  start_point?: string | null;
  /**
   * Конечная точка проводки
   * @minLength 1
   */
  finish_point?: string | null;
  /** Результат проводки (0/1) */
  result?: boolean | null;
  /** Status */
  status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  /** Пользователь */
  owner?: number;
}

export interface Ship {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 100
   */
  ship_name: string;
  /** Длина */
  length?: number | null;
  /**
   * Год постройки
   * @min -2147483648
   * @max 2147483647
   */
  year?: number | null;
  /**
   * Ледовый класс
   * @maxLength 10
   */
  ice_class?: string;
  /**
   * Двигатель
   * @maxLength 255
   */
  engine?: string;
  /** Изображение */
  image?: string | null;
  /** Описание */
  description?: string;
  /** Is active */
  is_active?: boolean;
}

export interface GetShip {
  ship: Ship[];
  /** Icebreaker id */
  icebreaker_id?: number | null;
  /** Items in cart */
  items_in_cart: number;
}

export interface UserLogin {
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

export interface UserUpdate {
  /**
   * Email
   * @format email
   */
  email?: string;
  /** Password */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://192.168.1.120:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Install server software API
 * @version v1
 * @license MIT License
 * @baseUrl http://192.168.1.120:8000/api
 * @contact <markovila539@gmail.com>
 *
 * API for installing server software
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  icebreakers = {
    /**
     * @description Получение списка заявок на проводку кораблей
     *
     * @tags icebreakers
     * @name IcebreakersList
     * @request GET:/icebreakers/
     * @secure
     */
    icebreakersList: (
      query?: {
        /** status */
        status?: string;
        /**
         * status
         * @format date-time
         */
        formation_start?: string;
        /**
         * status
         * @format date-time
         */
        formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Icebreaker[], void>({
        path: `/icebreakers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение заявки на проводку кораблей
     *
     * @tags icebreakers
     * @name IcebreakersRead
     * @request GET:/icebreakers/{icebreaker_id}/
     * @secure
     */
    icebreakersRead: (icebreakerId: string, params: RequestParams = {}) =>
      this.request<FullIcebreaker, void>({
        path: `/icebreakers/${icebreakerId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление заявки на проводку кораблей
     *
     * @tags icebreakers
     * @name IcebreakersDeleteDelete
     * @request DELETE:/icebreakers/{icebreaker_id}/delete/
     * @secure
     */
    icebreakersDeleteDelete: (icebreakerId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/icebreakers/${icebreakerId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Удаление корабәл из заявки на проводку
     *
     * @tags icebreakers
     * @name IcebreakersDeleteShipDelete
     * @request DELETE:/icebreakers/{icebreaker_id}/delete_ship/{ship_id}/
     * @secure
     */
    icebreakersDeleteShipDelete: (icebreakerId: string, shipId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/icebreakers/${icebreakerId}/delete_ship/${shipId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменение заявки на проводку кораблей
     *
     * @tags icebreakers
     * @name IcebreakersUpdateUpdate
     * @request PUT:/icebreakers/{icebreaker_id}/update/
     * @secure
     */
    icebreakersUpdateUpdate: (icebreakerId: string, data: PutIcebreaker, params: RequestParams = {}) =>
      this.request<PutIcebreaker, void>({
        path: `/icebreakers/${icebreakerId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Изменение порядка кораблей в заявке
     *
     * @tags icebreakers
     * @name IcebreakersUpdateShipUpdate
     * @request PUT:/icebreakers/{icebreaker_id}/update_ship/{ship_id}/
     * @secure
     */
    icebreakersUpdateShipUpdate: (
      icebreakerId: string,
      shipId: string,
      data: UpdateShipIcebreaker,
      params: RequestParams = {},
    ) =>
      this.request<ShipIcebreaker, void>({
        path: `/icebreakers/${icebreakerId}/update_ship/${shipId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Закрытие заявки на проводку кораблей модератором
     *
     * @tags icebreakers
     * @name IcebreakersUpdateStatusAdminUpdate
     * @request PUT:/icebreakers/{icebreaker_id}/update_status_admin/
     * @secure
     */
    icebreakersUpdateStatusAdminUpdate: (icebreakerId: string, data: ResolveIcebreaker, params: RequestParams = {}) =>
      this.request<ResolveIcebreaker, void>({
        path: `/icebreakers/${icebreakerId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Формирование заявки на установку ПО
     *
     * @tags icebreakers
     * @name IcebreakersUpdateStatusUserUpdate
     * @request PUT:/icebreakers/{icebreaker_id}/update_status_user/
     * @secure
     */
    icebreakersUpdateStatusUserUpdate: (icebreakerId: string, params: RequestParams = {}) =>
      this.request<Icebreaker, void>({
        path: `/icebreakers/${icebreakerId}/update_status_user/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  ships = {
    /**
     * No description
     *
     * @tags ships
     * @name ShipsList
     * @request GET:/ships/
     * @secure
     */
    shipsList: (
      query?: {
        /** ship_name */
        ship_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetShip, void>({
        path: `/ships/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Создание ПО
     *
     * @tags ships
     * @name ShipsCreateCreate
     * @request POST:/ships/create/
     * @secure
     */
    shipsCreateCreate: (data: Ship, params: RequestParams = {}) =>
      this.request<Ship, void>({
        path: `/ships/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получение корабля
     *
     * @tags ships
     * @name ShipsRead
     * @request GET:/ships/{ship_id}/
     * @secure
     */
    shipsRead: (shipId: string, params: RequestParams = {}) =>
      this.request<Ship, void>({
        path: `/ships/${shipId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление кораблә в заәвку на проводку
     *
     * @tags ships
     * @name ShipsAddToIcebreakerCreate
     * @request POST:/ships/{ship_id}/add_to_icebreaker/
     * @secure
     */
    shipsAddToIcebreakerCreate: (shipId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/ships/${shipId}/add_to_icebreaker/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Удаление ПО
     *
     * @tags ships
     * @name ShipsDeleteDelete
     * @request DELETE:/ships/{ship_id}/delete/
     * @secure
     */
    shipsDeleteDelete: (shipId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/ships/${shipId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Изменение корабля
     *
     * @tags ships
     * @name ShipsUpdateUpdate
     * @request PUT:/ships/{ship_id}/update/
     * @secure
     */
    shipsUpdateUpdate: (shipId: string, data: Ship, params: RequestParams = {}) =>
      this.request<Ship, void>({
        path: `/ships/${shipId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ships
     * @name ShipsUpdateImageCreate
     * @request POST:/ships/{ship_id}/update_image/
     * @secure
     */
    shipsUpdateImageCreate: (
      shipId: string,
      data: {
        /**
         * Image
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/ships/${shipId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  users = {
    /**
     * @description Вход
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (
      data: {
        /** username */
        username: string;
        /** password */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserLogin, void>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Выход
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Создание пользователя
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Обновление данных пользователя
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserUpdate, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
