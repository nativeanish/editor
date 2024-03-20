import { Button, Chip, Tooltip } from "@nextui-org/react";
import { FaHeart, FaUser } from "react-icons/fa";
import { SiUnlicense } from "react-icons/si";
import { like } from "../../utils/ao";
interface Props {
  udl: string;
  owner: string;
  like: number;
  id: string;
  title: string;
}
function Util(props: Props) {
  const li = async () => {
    await like(props.id);
  };
  return (
    <>
      <hr className="h-px my-8 border-1 bg-black border-gray-400" />
      <div className="container mx-auto">
        <div className="container mx-auto md:w-1/2 w-full relative mt-3">
          <div className="flex flex-row items-start justify-start space-x-2 p-4 rounded-lg lg:items-center lg:justify-center">
            <Tooltip content={"Like"}>
              <Button size="lg" onClick={() => li().then().catch(console.log)}>
                <FaHeart /> {props.like} Like
              </Button>
            </Tooltip>
            <Tooltip content={`${props.udl} UDL`}>
              <Chip size="lg" startContent={<SiUnlicense />}>
                License Type: {props.udl}
              </Chip>
            </Tooltip>
            <Tooltip content={`${props.udl} UDL`}>
              <Chip size="lg" startContent={<FaUser />}>
                {props.owner}
              </Chip>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export default Util;
