import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 200,
  damping: 28,
  mass: 1
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.985 }}
      transition={{ ...spring, duration: 0.5 }}
      className="min-h-[60vh]"
    >
      {children}
    </motion.div>
  );
}

/* Каскадное появление */
export function FadeInStagger({ children, gap = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { transition: { staggerChildren: gap } },
        show:   { transition: { staggerChildren: gap } }
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show:   { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
