import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get_articles } from "../../utils/ao";
import axios from "axios";
import Editor from "../../Component/Editor";
import Comment from "./Comment";
import Util from "./Util";
export interface _Comment {
  content: string;
  like: Array<{ address: string }>;
  created_at: string;
  owner: Array<{ address: string }>;
}
function Articles() {
  const { username, title } = useParams();
  const navigate = useNavigate();
  const [_json, setJson] = useState<null | string>(null);
  const [comments, setComments] = useState<Array<_Comment>>([]);
  const [_article_id, setArticle] = useState<null | string>(null);
  const [license, setLicense] = useState<string>("");
  const [like, setLike] = useState<number>(0);
  const get = useCallback(async () => {
    if (username?.length && title?.length) {
      // const data = await get_User(username);
      // if (!data) {
      //   navigate("/");
      // }
      const __article = await get_articles(title);
      if (__article?.status) {
        const article = __article.data;
        if (article.id) {
          setArticle(article.id);
          setLicense(__article.data.udl);
          setLike(__article.data.like.length);
          setComments(__article.data.comment);
          const ax = await axios.get(`https://arweave.net/${article?.id}`);
          console.log(ax);
          if (ax.status === 200 || 202) {
            const json = ax.data;
            for (let i = 0; i < json.root.children.length; i++) {
              //@ts-ignore
              for (let j = 0; j < json.root.children[i].children.length; j++) {
                //@ts-ignore
                if (json.root.children[i].children[j].type === "image") {
                  const data = await axios.get(
                    `${json.root.children[i].children[j].src}`
                  );
                  if (data.status === 200 || 202) {
                    //@ts-ignore
                    json.root.children[i].children[j].src = data.data;
                  }
                }
              }
            }
            setJson(JSON.stringify(json));
          } else {
            console.log("Error");
            navigate("/");
          }
        }
      }
    } else {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (username?.length && title?.length) {
      get().then(console.log).catch(console.log);
    }
  }, [username, title, get]);
  return (
    <div>
      <div className="container mx-auto mt-4">
        {_json &&
        _json.length &&
        _article_id &&
        username?.length &&
        title?.length ? (
          <>
            <Editor state={_json} editable={false} toolbar={false} />
            <Util
              udl={license}
              owner={username}
              like={like}
              id={_article_id}
              title={title}
            />
            <Comment article_id={_article_id} comment={comments} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Articles;
