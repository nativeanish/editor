import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import Modals from "./Modals";
import { useEffect } from "react";
interface Props {
  title: "Error" | "Warning";
  descrption: string;
}
function Alert(props: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, [props.title, props.descrption]);
  return (
    <>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={props.title}
        Body={<Body title={props.title} description={props.descrption} />}
      />
    </>
  );
}

export default Alert;
interface Prop {
  title: "Error" | "Warning";
  description: string;
}
function Body(props: Prop) {
  return (
    <>
      {props.title === "Error" ? (
        <div className="text-center">
          <Card>
            <CardBody className="text-red-600">{props.description}</CardBody>
          </Card>
        </div>
      ) : (
        <div className="text-center ">
          <Card className="text-yellow-600">
            <CardBody>{props.description}</CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
