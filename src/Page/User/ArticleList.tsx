import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { get_articles_by_id } from "../../utils/ao";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface Props {
  address: Array<string>;
  username: string;
}
interface Articles {
  title: string;
  id: string;
  like: Array<{ address: string }>;
  tag: Array<string>;
  created_at: string;
  udl: string;
  owner: Array<{ address: string }>;
  comment: Array<Comment>;
}
function ArticleList(props: Props) {
  const [state, setState] = useState<Articles[]>([]);
  const get = async (address: string) => {
    const data: { status: boolean; data: Articles } = await get_articles_by_id(
      address
    );
    if (data.status) {
      setState([...state, data.data]);
    }
  };
  useEffect(() => {
    if (props.address.length) {
      for (const key of props.address) {
        get(key).then().catch(console.log);
      }
    }
  }, [props.address]);
  const navigate = useNavigate();
  return (
    <>
      {state.length ? (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-6 items-center justify-center">
          {state.map((e, i) => (
            <>
              <Card className="max-w-[400px]" key={i + 1}>
                <CardHeader className="flex gap-3" key={i + 2}>
                  <p
                    key={i + 3}
                    className="text-2xl font-bold text-blue-500 cursor-pointer hover:underline"
                    onClick={() => navigate(`/@/${props.username}/${e.title}`)}
                  >
                    {e.title}
                  </p>
                </CardHeader>
                <Divider key={i + 4} />
                <CardBody key={i + 5}>
                  <div
                    key={i + 6}
                    className="flex flex-row gap-10 items-center justify-center"
                  >
                    <Chip key={i + 7} startContent={<FcLike />}>
                      {e.like.length} Like
                    </Chip>
                    <Chip key={i + 8} startContent={<FaComment />}>
                      {e.comment.length} Comment
                    </Chip>
                  </div>
                </CardBody>
                <Divider key={i + 9} />
                <CardFooter
                  key={i}
                  className="items-center justify-center flex"
                >
                  <Chip color="primary" key={i + 10} size="sm">
                    {e.owner[0].address}
                  </Chip>
                </CardFooter>
              </Card>
            </>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default ArticleList;
