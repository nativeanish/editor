import useAddress from "../store/useAddress";
import useAccount from "../store/useAccount";
import { useNavigate, useParams } from "react-router-dom";
import usePageHead from "../store/usePageHead";
import { useEffect } from "react";
import Editor from "../Component/Editor";
function WEditor() {
  const address = useAddress((state) => state.address);
  const account = useAccount((state) => state.account);
  const _username = useAccount((state) => state.username);
  const set_Head = usePageHead((state) => state.set_heading);
  const navigate = useNavigate();
  const { username, head } = useParams();
  useEffect(() => {
    if (!username?.length || !head?.length) {
      navigate("/");
    }
    if (!address?.length || !account) {
      navigate("/");
    }
    if (username !== _username) {
      navigate("/");
    }
    if (head) {
      set_Head(head);
    }
  }, [address, account]);
  return (
    <>
      <Editor editable={true} toolbar={true} />
    </>
  );
}

export default WEditor;
