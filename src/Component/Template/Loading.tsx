import {
  Modal,
  useDisclosure,
  ModalHeader,
  ModalContent,
  ModalBody,
  Spinner,
} from "@nextui-org/react";
import useAlertLoading from "../../store/useAlertLoading";
import { useEffect } from "react";

function Loading() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const title = useAlertLoading((state) => state.title);
  const description = useAlertLoading((state) => state.description);
  const loading = useAlertLoading((state) => state.show);
  useEffect(() => {
    if (loading) {
      onOpen();
    } else {
      onClose();
    }
  }, [loading]);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        onClose={onClose}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <div className="items-center justify-center space-y-2">
                <div className="flex justify-center items-center">
                  <Spinner size="lg" color="secondary" />
                </div>
                <h6 className="text-center">{description}</h6>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Loading;
