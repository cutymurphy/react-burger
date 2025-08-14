import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TApplicationActions } from "./services/types";
import { setToken } from "./services/actions/user";
import { getAccessToken } from "./utils/requestWithRefresh";
import toast from "react-hot-toast";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "./services/constants";
import {
  getAllOrdersError,
  getAllOrdersRequest,
  getAllOrdersSuccess,
} from "./services/actions/allOrders";
import {
  getOrdersError,
  getOrdersRequest,
  getOrdersSuccess,
} from "./services/actions/orders";
import { TGetOrdersData } from "./services/types/data";
import { EErrors } from "./utils/errors";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    const sockets: Record<string, WebSocket> = {};

    return (next) => async (action: TApplicationActions) => {
      const { dispatch } = store;

      switch (action.type) {
        case WS_CONNECTION_START: {
          const url = action.url;

          if (sockets[url]) {
            return next(action);
          }

          const socket = new WebSocket(url);
          sockets[url] = socket;

          socket.onopen = () => {
            if (url.includes("/orders/all")) {
              dispatch(getAllOrdersRequest());
            } else if (url.includes("/orders?token=")) {
              dispatch(getOrdersRequest());
            }
          };

          socket.onerror = () => {
            if (url.includes("/orders/all")) {
              dispatch(getAllOrdersError());
            } else {
              dispatch(getOrdersError());
            }
          };

          socket.onmessage = async (event) => {
            try {
              const data: TGetOrdersData = JSON.parse(event.data);

              if (data?.message === EErrors.OLD_TOKEN) {
                try {
                  const refreshData = await getAccessToken();
                  const newToken = refreshData.accessToken.split("Bearer ")[1];
                  localStorage.setItem(
                    "refreshToken",
                    refreshData.refreshToken
                  );
                  dispatch(setToken(newToken));

                  const newUrl = new URL(url);
                  newUrl.searchParams.set("token", newToken);

                  dispatch({
                    type: WS_CONNECTION_START,
                    url: newUrl.toString(),
                  });
                } catch (err) {
                  toast.error("Ошибка при обновлении токена");
                }
                return;
              }

              const validOrders = data.orders.filter(
                (order) => !!order && order._id
              );

              if (url.includes("/orders/all")) {
                setTimeout(() => {
                  dispatch(
                    getAllOrdersSuccess(
                      validOrders,
                      data.total,
                      data.totalToday
                    )
                  );
                }, 1000);
              } else if (url.includes("/orders?token=")) {
                setTimeout(() => {
                  dispatch(getOrdersSuccess(validOrders.reverse()));
                }, 1000);
              }
            } catch (err) {
              if (url.includes("/orders/all")) {
                dispatch(getAllOrdersError());
              } else {
                dispatch(getOrdersError());
              }
              toast.error("Произошла ошибка при получении заказов");
            }
          };

          socket.onclose = () => {
            delete sockets[url];
          };

          break;
        }

        case WS_CONNECTION_CLOSED: {
          const url = action.url;
          if (url && sockets[url]) {
            sockets[url].close();
            delete sockets[url];
          }
          break;
        }
      }

      return next(action);
    };
  }) as Middleware;
};
