'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
  originX: number;
  originY: number;
  children: ReactNode;
}

export default function SectionPanel({
  isOpen,
  onClose,
  originX,
  originY,
  children,
}: SectionPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 section-panel"
          style={{
            zIndex: 50,
            background: '#020817',
            transformOrigin: `${originX}px ${originY}px`,
          }}
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.1, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Back Button */}
          <motion.button
            onClick={onClose}
            className="fixed top-6 left-6 z-[60] glass rounded-full px-5 py-2.5 flex items-center gap-3 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            whileHover={{ scale: 1.04 }}
          >
            <span
              className="w-2 h-2 rounded-full bg-[#00d4ff]"
              style={{
                animation: 'breathe 2s ease-in-out infinite',
                boxShadow: '0 0 8px #00d4ff',
              }}
            />
            <span className="font-orbitron text-xs tracking-wider text-[#00d4ff] uppercase">
              ← Neural Map
            </span>
          </motion.button>

          {/* Content with stagger */}
          <motion.div
            className="min-h-screen px-6 py-20 md:px-12 lg:px-20"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StaggerChild({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  );
}
