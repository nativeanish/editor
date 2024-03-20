import { Button, Card, CardHeader, Divider, Image } from "@nextui-org/react";
import { AiTwotoneCamera } from "react-icons/ai";
import { RiLoopLeftFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";
import { ChangeEvent, useEffect } from "react";
import useIntroField from "../../store/Onboard/useIntroField";
import useIntro from "../../store/Onboard/useIntro";
import { register } from "../../utils/ao";
const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 2, type: "spring" } },
};
function IImage() {
  const _set = useIntro((state) => state.set);
  const _data = useIntroField((state) => state.data);
  const _type = useIntroField((state) => state.type);
  const _setup = useIntroField((state) => state.setup);
  useEffect(() => {
    _setup(getRandomAvatar() as string, "svg");
  }, []);
  const re = () => {
    _setup(getRandomAvatar() as string, "svg");
  };
  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const mar = e.target.files[0].type;
      if (
        mar === "image/png" ||
        mar === "image/svg+xml" ||
        mar === "image/jpeg"
      ) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          _setup(reader.result as string, "base64");
        });
        reader.readAsDataURL(e.target.files[0]);
      } else {
        console.log("YOu have not uploaded image");
      }
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
          className="mx-3 flex flex-col items-center space-y-4 text-center sm:mx-auto"
        >
          <motion.h3
            className="font-display text-3xl transition-colors sm:text-3xl text-gray-900"
            variants={STAGGER_CHILD_VARIANTS}
          >
            How do you look?
          </motion.h3>
          <motion.p
            className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
            variants={STAGGER_CHILD_VARIANTS}
          ></motion.p>
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            {" "}
            <Card>
              <CardHeader className="flex gap-9">
                <div className="flex flex-col space-y-3">
                  {_data?.length && _type ? (
                    <Image
                      alt="nextui logo"
                      height={200}
                      radius="sm"
                      src={
                        _type === "svg"
                          ? `data:image/svg+xml;base64,${btoa(_data)}`
                          : _type === "base64"
                          ? _data
                          : `data:image/svg+xml;base64,${btoa(_data)}`
                      }
                      width={200}
                      style={{ height: 200, width: 200 }}
                    />
                  ) : null}
                  <Divider />
                  <Button
                    color="primary"
                    endContent={<RiLoopLeftFill />}
                    onClick={() => re()}
                  >
                    Regenerate
                  </Button>
                  <Button color="success" endContent={<AiTwotoneCamera />}>
                    Take a Photo
                    <input
                      type="file"
                      className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                      accept="image*/"
                      onChange={upload}
                    />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            // className="rounded  px-10 py-2 font-medium transition-colors text-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-500"
          >
            <Button
              color="secondary"
              size="lg"
              onClick={() =>
                register()
                  .then((data) => {
                    if (data) {
                      _set("final");
                    }
                  })
                  .catch(console.log)
              }
            >
              Yes I look that, Register
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default IImage;
