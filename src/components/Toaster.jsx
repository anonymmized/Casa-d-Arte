import { createContext, useContext, useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react"; // если нет — можно убрать иконку или поставить любой svg

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutRefs = useRef({});

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const ref = timeoutRefs.current[id];
    if (ref) {
      clearTimeout(ref);
      delete timeoutRefs.current[id];
    }
  }, []);

  const show = useCallback(
    ({ title = "Успешно", description, variant = "success", duration = 2200 } = {}) => {
      const id = ++idCounter;
      const toast = { id, title, description, variant };
      setToasts((prev) => [toast, ...prev]); // сверху новые

      // автозакрытие
      timeoutRefs.current[id] = setTimeout(() => remove(id), duration);

      return id;
    },
    [remove]
  );

  const api = useMemo(() => ({ show, remove }), [show, remove]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[9999] flex justify-center px-3">
        <div className="flex w-full max-w-md flex-col gap-2">
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ y: -20, opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className={[
                  "pointer-events-auto rounded-2xl p-3 sm:p-4 shadow-lg ring-1 backdrop-blur",
                  "border",
                  t.variant === "success"
                    ? "bg-white/80 text-emerald-900 border-emerald-200 ring-emerald-100 dark:bg-emerald-900/70 dark:text-emerald-50 dark:border-emerald-800 dark:ring-emerald-800/50"
                    : t.variant === "error"
                    ? "bg-white/80 text-red-900 border-red-200 ring-red-100 dark:bg-red-900/70 dark:text-red-50 dark:border-red-800 dark:ring-red-800/50"
                    : "bg-white/80 text-ink border-gray-200 ring-gray-100 dark:bg-neutral-900/70 dark:text-neutral-50 dark:border-neutral-800 dark:ring-neutral-800/50",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium leading-tight">{t.title}</div>
                    {t.description ? (
                      <div className="text-sm/5 opacity-80 mt-0.5">{t.description}</div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => api.remove(t.id)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition"
                    aria-label="Закрыть уведомление"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}
