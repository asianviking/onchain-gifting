"use client";

import { motion } from "framer-motion";

export function GiftBoxHovering({
  setIsHovering,
}: {
  setIsHovering: (isHovering: boolean) => void;
}) {
  return (
    <motion.div
      className="cursor-pointer text-[220px] md:text-[420px]"
      animate={{
        y: [0, -15, 0],
        scale: [1, 1.02, 1],
        transition: {
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      whileHover={{
        scale: 1.1,
        transition: {
          duration: 0.2,
        },
      }}
      onClick={() => setIsHovering(false)}
    >
      🎁
    </motion.div>
  );
}
