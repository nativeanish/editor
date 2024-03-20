import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import useIntro from "../../store/Onboard/useIntro";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 2, type: "spring" } },
};
export default function Intro() {
  const _set = useIntro((state) => state.set);
  return (
    <>
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
          <motion.h1
            className="font-display text-4xl font-bold  transition-colors sm:text-5xl text-gray-900"
            variants={STAGGER_CHILD_VARIANTS}
          >
            Welcome to{" "}
            <span className="font-bold tracking-tighter  text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              verses.studio
            </span>
          </motion.h1>
          <motion.p
            className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          >
            Lorpem ipsum dolor sit amet Lorpem ipsum dolor sit amet Lorpem ipsum
            dolor sit amet
          </motion.p>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            // className="rounded  px-10 py-2 font-medium transition-colors text-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-500"
          >
            <Button color="secondary" size="lg" onClick={() => _set("name")}>
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
