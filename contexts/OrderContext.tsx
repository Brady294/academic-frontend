"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
  OrderData,
} from "@/services/orderService";

interface Order {
  id: number;
  user_id: number;
  title: string;
  subject: string;
  service_type: string;
  academic_level: string;
  pages: number;
  spacing: string;
  citation_style: string;
  deadline: string;
  instructions: string;
  budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;

  fetchOrders: () => Promise<void>;

  addOrder: (data: OrderData) => Promise<any>;

  editOrder: (
    id: number,
    data: Partial<OrderData>
  ) => Promise<any>;

  removeOrder: (
    id: number
  ) => Promise<any>;
}

const OrderContext =
  createContext<OrderContextType | null>(
    null
  );

export function OrderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [orders, setOrders] = useState<
    Order[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchOrders() {
    try {
      const data = await getOrders();

      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addOrder(
    data: OrderData
  ) {
    const response =
      await createOrder(data);

    await fetchOrders();

    return response;
  }

  async function editOrder(
    id: number,
    data: Partial<OrderData>
  ) {
    const response =
      await updateOrder(id, data);

    await fetchOrders();

    return response;
  }

  async function removeOrder(
    id: number
  ) {
    const response =
      await deleteOrder(id);

    await fetchOrders();

    return response;
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        fetchOrders,
        addOrder,
        editOrder,
        removeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context =
    useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrders must be used inside OrderProvider."
    );
  }

  return context;
}