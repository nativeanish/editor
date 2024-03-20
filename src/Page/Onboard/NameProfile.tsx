import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import useIntro from "../../store/Onboard/useIntro";
import useIntroField from "../../store/Onboard/useIntroField";
import { useState } from "react";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 2, type: "spring" } },
};

function NameProfile() {
  const _set = useIntro((state) => state.set);
  const set_name = useIntroField((state) => state.set_name);
  const [error, setError] = useState("");
  const change = (e: string) => {
    if (e.length > 0) {
      if (e.length < 71) {
        set_name(e);
        setError("");
      } else {
        setError("Full Name cannot be more than 70 characters.");
      }
    } else {
      setError("");
    }
  };
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
          <motion.h3
            className="font-display text-4xl   transition-colors sm:text-5xl text-gray-900"
            variants={STAGGER_CHILD_VARIANTS}
          >
            You gotcha a name right, What is it ?
          </motion.h3>
          <motion.p
            className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          ></motion.p>
          <motion.div
            className="flex w-full items-center justify-center"
            variants={STAGGER_CHILD_VARIANTS}
          >
            <Input
              type="text"
              variant="underlined"
              label="My Name is"
              placeholder="John Doe"
              color="secondary"
              fullWidth={false}
              className="w-6/12 text-3xl"
              isClearable
              autoFocus
              onValueChange={change}
              description="You can change anytime"
              errorMessage={error.length && error}
            />
          </motion.div>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            // className="rounded  px-10 py-2 font-medium transition-colors text-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-500"
          >
            <Button
              color="secondary"
              size="lg"
              onClick={() => _set("username")}
              isDisabled={Boolean(error.length)}
            >
              Yes, that is my full name
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default NameProfile;
