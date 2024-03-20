import { motion } from "framer-motion";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { check_user } from "../../utils/ao";
import { useNavigate } from "react-router-dom";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 2, type: "spring" } },
};

function LastT() {
  const naviage = useNavigate();
  useEffect(() => {
    check_user().then(console.log).catch(console.log);
    setTimeout(() => {
      naviage("/dashboard");
    }, 5000);
  }, []);
  return (
    <>
      <Confetti
        height={window.innerHeight}
        width={window.innerWidth}
      ></Confetti>
      <motion.div
        className="z-10"
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
        >
          <motion.h3
            className="font-display text-4xl   transition-colors text-gray-900"
            variants={STAGGER_CHILD_VARIANTS}
          >
            If you are here then congratulations, you are now a member of{" "}
            <span className="font-bold tracking-tighter  text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              verses.studio
            </span>
          </motion.h3>
          <motion.p
            className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          ></motion.p>
          <motion.p
            className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          >
            You will be redirected to Dashboard in 5 seconds or redirect to{" "}
            <a
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 after:content-['_↗']"
              onClick={() => naviage("/dashboard")}
            >
              dashboard
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default LastT;
