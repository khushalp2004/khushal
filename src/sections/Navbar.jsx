import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <motion.a
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          href="#home"
          className="nav-link cursor-pointer"
        >
          Home
        </motion.a>
      </li>
      <li className="nav-li">
        <motion.a
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          href="#about"
          className="nav-link cursor-pointer"
        >
          About
        </motion.a>
      </li>
      <li className="nav-li">
        <motion.a
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          href="#projects"
          className="nav-link cursor-pointer"
        >
          Projects
        </motion.a>
      </li>
      <li className="nav-li">
        <motion.a
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          href="#achievements"
          className="nav-link cursor-pointer"
        >
          Achievements
        </motion.a>
      </li>
      <li className="nav-li">
        <motion.a
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          href="#contact"
          className="nav-link cursor-pointer"
        >
          Contact
        </motion.a>
      </li>
      <li className="nav-li">
        <motion.a
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          href="https://drive.google.com/file/d/1ekltTvJzL6c7OluQjKPRLZZekLUi-wrk/view"
          target="_blank"
          className="text-white nav-link cursor-pointer "
        >
          Resume
        </motion.a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed inset-x-0 z-20 w-full md:backdrop-blur-lg ${isOpen ? 'bg-primary/90' : 'bg-primary/40'}`}>
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            className="text-xl font-bold transition-colors text-white hover:text-white cursor-pointer"
            href="/"
          >
            Khushal
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6 cursor-pointer"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="block overflow-hidden text-center sm:hidden"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="pb-5">
              <Navigation />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;