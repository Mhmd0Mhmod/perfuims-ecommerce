import { addToCart, clearCart, editCartItem, removeFromCart } from "@/app/(shop)/actions";
import { CartAPI } from "@/lib/api/cart";
import { IAPIResponse } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useCallback, useRef } from "react";
import { toast } from "sonner";

type ToastMessages = {
  loading: string;
  success: string;
  error: string;
};
const addMessages: ToastMessages = {
  loading: "جاري إضافة المنتج للسلة...",
  success: "تم إضافة المنتج للسلة",
  error: "حدث خطأ أثناء إضافة المنتج للسلة",
};
const clearMessages: ToastMessages = {
  loading: "جاري تفريغ السلة...",
  success: "تم تفريغ السلة بنجاح",
  error: "حدث خطأ أثناء تفريغ السلة",
};

const removeMessages: ToastMessages = {
  loading: "جاري إزالة المنتج من السلة...",
  success: "تم إزالة المنتج من السلة",
  error: "حدث خطأ أثناء إزالة المنتج من السلة",
};

const editMessages: ToastMessages = {
  loading: "جاري تعديل الكمية...",
  success: "تم تعديل الكمية بنجاح",
  error: "حدث خطأ أثناء تعديل الكمية",
};

export function useCart() {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const toastIdRef = useRef<string | number | undefined>(undefined);

  const handleMutate = useCallback((message: string) => {
    toastIdRef.current = toast.loading(message);
  }, []);

  const handleSettled = useCallback(
    (data: IAPIResponse | undefined, messages: ToastMessages) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success(data.message ?? messages.success, {
          id: toastIdRef.current,
        });
      } else {
        toast.error(data?.message ?? messages.error, {
          id: toastIdRef.current,
        });
      }
    },
    [queryClient],
  );

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: CartAPI.getCart,

    enabled: status === "authenticated",
  });

  const addMutation = useMutation({
    mutationFn: addToCart,
    onMutate: () => handleMutate(addMessages.loading),
    onSettled: (data) => handleSettled(data, addMessages),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onMutate: () => handleMutate(removeMessages.loading),
    onSettled: (data) => handleSettled(data, removeMessages),
  });

  const editMutation = useMutation({
    mutationFn: editCartItem,
    onMutate: () => handleMutate(editMessages.loading),
    onSettled: (data) => handleSettled(data, editMessages),
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onMutate: () => handleMutate(clearMessages.loading),
    onSettled: (data) => handleSettled(data, clearMessages),
  });

  const totalPrice =
    cartQuery.data?.reduce(
      (total, item) => total + item.variantDetails.newPrice * item.quantity,
      0,
    ) ?? 0;
  return {
    items: cartQuery.data ?? [],
    addMutation,
    removeMutation,
    editMutation,
    clearMutation,
    totalPrice,
    isCartLoading: cartQuery.isLoading || cartQuery.isFetching,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isEditing: editMutation.isPending,
    isClearing: clearMutation.isPending,
    isMutating:
      addMutation.isPending ||
      removeMutation.isPending ||
      editMutation.isPending ||
      clearMutation.isPending,
  };
}
