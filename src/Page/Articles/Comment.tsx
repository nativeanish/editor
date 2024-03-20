import { Avatar, Button, Textarea } from "@nextui-org/react";
import useAddress from "../../store/useAddress";
import useAccount from "../../store/useAccount";
import { useCallback, useEffect, useState } from "react";
import { get_user_details, like_comment, upload_Comment } from "../../utils/ao";
import { _Comment } from ".";
import { FaHeart } from "react-icons/fa";
interface Props {
  article_id: string;
  comment: Array<_Comment> | [];
}
function Comment(props: Props) {
  const address = useAddress((state) => state.address);
  const img = useAccount((state) => state.img);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState<boolean | null>(null);
  const set_img = useCallback(async () => {
    setLoading(false);
    for (let a of props.comment) {
      const data = await get_user_details(a.owner[0].address);
      // console.log(data.data.img.url);
      if (data.data.img.url) {
        a.created_at = data.data.img.url;
      }
    }
    setLoading(true);
  }, [props.comment]);
  useEffect(() => {
    console.log(props.article_id);
    if (props.comment.length) {
      set_img().then().catch(console.log);
    }
  }, [img, props.comment]);
  const comment = () => {
    upload_Comment(text, props.article_id).then(console.log).catch(console.log);
  };
  const comment_like = async (id: string) => {
    await like_comment(id, props.article_id);
  };
  return (
    <div className="container mx-auto">
      <div className="container mx-auto md:w-1/2 w-full relative mt-3">
        {address?.length && img?.length ? (
          <div>
            <div className="flex flex-row space-x-2">
              <Avatar src={`http://arweave.net/${img}`} size="lg" />
              <Textarea
                label="Comment"
                labelPlacement="outside"
                placeholder="Enter your Comment Here"
                color="primary"
                variant="bordered"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
            </div>
            <div className="flex justify-end mt-2">
              <Button type="button" color="primary" onClick={() => comment()}>
                Comment
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="container mx-auto md:w-1/2 w-full relative mt-3">
        {props.comment.length && loading ? (
          <>
            {props.comment.map((e, i) => (
              <>
                <div key={i}>
                  <div key={i + 1} className="flex flex-row space-x-2">
                    <Avatar
                      key={i + 2}
                      src={`http://arweave.net/${e.created_at}`}
                      size="lg"
                    />
                    <Textarea
                      isReadOnly
                      key={i + 3}
                      label={`${e.owner[0].address}`}
                      labelPlacement="outside"
                      placeholder="Enter your Comment Here"
                      color="primary"
                      variant="bordered"
                      value={e.content}
                    />
                  </div>
                  <div key={i + 4} className="flex justify-end mt-2">
                    <Button
                      key={i + 5}
                      type="button"
                      onClick={() => comment_like(e.content)}
                    >
                      <FaHeart /> {e.like.length} like
                    </Button>
                  </div>
                </div>
              </>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Comment;
