import {
  Avatar,
  Card,
  CardBody,
  Chip,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import Modals from "../../Component/Template/Modals";
import { useCallback, useEffect, useState } from "react";
import { get_articles, get_User, get_user_details } from "../../utils/ao";
import { useNavigate } from "react-router-dom";

function Search() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const search = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    if (!target.search.value.length) {
      return;
    }
    setText(target.search.value);
    onOpen();
  };
  return (
    <div>
      <section className="mt-12 lg:mt-24">
        <div className="bg-teal-500 text-white -skew-y-1">
          <div className="container mx-auto skew-y-1">
            <div className="flex flex-col items-center py-10 text-center lg:py-20">
              <div className="w-full px-4 lg:w-1/2 lg:px-0">
                <div className="mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                    Looking for a Article?
                  </h2>
                  <p className="text-lg lg:text-xl opacity-80">
                    Search the Database for the answer to your question
                  </p>
                </div>

                <div className="mb-10">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>

                    <form onSubmit={search}>
                      <input
                        type="search"
                        name="search"
                        placeholder="Search here for Articles and User"
                        className="p-4 pl-10 text-gray-600 rounded w-full border-gray-100"
                      />
                    </form>
                  </div>
                </div>

                <div className="text-lg">
                  <p>
                    Can't find what you're looking for?{" "}
                    <br className="sm:hidden" />
                    <a href="#" className="border-b border-white pb-1">
                      Create a new Article
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Search"
        Body={<Body onClose={onClose} text={text} />}
      />
    </div>
  );
}
export default Search;
interface Articles {
  title: string;
  id: string;
  like: Array<{ address: string }>;
  tag: Array<string>;
  created_at: string;
  udl: string;
  owner: Array<{ address: string }>;
  comment: Array<Comment>;
  username: string;
}
interface User {
  name: string;
  username: string;
  img: { url: string; type: "svg" | "base64" };
  created_at: string;
  articles: Array<string>;
  follower: Array<{ address: string }>;
  following: Array<{ address: string }>;
}
const Body = ({ text }: { onClose: () => void; text: string }) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Array<Articles>>([]);
  const [user, setUser] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(false);
  const get = useCallback(async () => {
    setLoading(true);
    const data = await get_articles(text.split(" ").join("-"));
    if (data.status) {
      const __username = await get_user_details(data.data.owner[0].address);
      console.log(__username);
      setArticles([
        ...articles,
        { username: __username.data.username, ...data.data },
      ]);
    }
    const _user = await get_User(text);
    if (_user.username === text) {
      setUser([...user, _user]);
    }
    setLoading(false);
  }, [text]);
  useEffect(() => {
    get().then().catch(console.log);
  }, [text]);
  return (
    <>
      {loading ? (
        <div>
          <div className="flex flex-col space-y-2 items-center justify-center">
            <Spinner size="lg" />
            <p className="text-lg text-center">Searching...</p>
          </div>
        </div>
      ) : (
        <>
          {user.length || articles.length ? (
            <>
              <div id="articles" className="space-y-2">
                {articles.map((e, i) => (
                  <Card key={i}>
                    <CardBody key={i + 1}>
                      <p
                        key={i + 2}
                        className="text-blue-400 hover:underline"
                        onClick={() => navigate(`/@/${e.username}/${e.title}`)}
                      >
                        {e.title}
                      </p>
                    </CardBody>
                  </Card>
                ))}
                <hr className="border-black borde-2" />
                {user.map((e, i) => (
                  <>
                    <Card key={i + 4}>
                      <CardBody
                        key={i + 5}
                        className="flex justify-between flex-row"
                      >
                        <Avatar
                          src={`https://arweave.net/${e.img.url}`}
                          key={i + 11}
                        />
                        <p
                          key={i + 6}
                          className="text-blue-400 hover:underline"
                          onClick={() => navigate(`/@/${e.username}`)}
                        >
                          {e.name}{" "}
                        </p>
                        <Chip
                          color="primary"
                          key={i + 9}
                          className="justify-end"
                        >
                          @{e.username}
                        </Chip>
                      </CardBody>
                    </Card>
                  </>
                ))}
              </div>
            </>
          ) : (
            <p className="text-lg text-center">Nothing Found</p>
          )}
        </>
      )}
    </>
  );
};
