"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PHONE_DISPLAY = "+91 79030 91869";
const PHONE_HREF = "tel:+917903091869";

export default function CallButton() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-paper transition-colors duration-300 hover:border-volt focus-visible:border-volt"
      >
        {/* Ringing phone icon (lime accent); stops once revealed / under reduced motion */}
        <motion.span
          aria-hidden="true"
          className="inline-flex text-volt"
          style={{ transformOrigin: "50% 0%" }}
          animate={reduced || open ? undefined : { rotate: [0, -12, 10, -8, 6, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: "easeInOut",
          }}
        >
          <Phone size={16} />
        </motion.span>
        call us
      </button>

      {/* Revealed phone number slides out as a tel: link */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.a
            key="number"
            href={PHONE_HREF}
            className="overflow-hidden whitespace-nowrap border-b-2 border-volt pb-0.5 font-mono text-lg text-paper"
            initial={reduced ? { opacity: 0 } : { opacity: 0, width: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, width: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {PHONE_DISPLAY}
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
