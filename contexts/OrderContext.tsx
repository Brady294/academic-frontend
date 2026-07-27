"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import orderService from "@/services/orderService";
import { Order } from "@/types/order";

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  selectedOrder: Order | null;

  refreshOrders: () => Promise<void>;
  getOrder: (id: number | string) => Promise<void>;
  createOrder: (data: any) => Promise<any>;
  updateOrder: (id: number | string, data: any) => Promise<any>;
  deleteOrder: (id: number | string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType
);

export function OrderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [orders, setOrders] = useState<Order[]>([]);

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  async function refreshOrders() {
    try {
      setLoading(true);

      const data = await orderService.getOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function getOrder(id: number | string) {
    try {
      const order = await orderService.getOrder(id);

      setSelectedOrder(order);
    } catch (error) {
      console.error(error);
    }
  }

  async function createOrder(data: any) {
    const response = await orderService.createOrder(data);

    await refreshOrders();

    return response;
  }

  async function updateOrder(
    id: number | string,
    data: any
  ) {
    const response = await orderService.updateOrder(id, data);

    await refreshOrders();

    return response;
  }

  async function deleteOrder(id: number | string) {
    await orderService.deleteOrder(id);

    await refreshOrders();
  }

  useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        selectedOrder,
        refreshOrders,
        getOrder,
        createOrder,
        updateOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}