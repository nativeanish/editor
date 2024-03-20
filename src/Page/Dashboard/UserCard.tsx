import useAddress from "../../store/useAddress";
import useAccount from "../../store/useAccount";
import { follow } from "../../utils/ao";
interface Props {
  _address: string;
  name: string;
  _username: string;
  img: string;
  articles: Array<string>;
  follower: Array<{ address: string }>;
  following: Array<{ address: string }>;
}
function UserCard(props: Props) {
  const c_address = useAddress((state) => state.address);
  const c_username = useAccount((state) => state.username);
  return (
    <div className="xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white border-black border-4 shadow-xl rounded-lg text-gray-900">
      <>
        <div className="rounded-t-lg h-32 overflow-hidden"></div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-black rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32"
            src={`https://arweave.net/${props.img}`}
            alt="Woman looking front"
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{props.name}</h2>
          <p className="text-gray-400">@{props._username}</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <div>{props.articles.length}</div>
            <p>Articles</p>
          </li>
          <li className="flex flex-col items-center justify-between">
            <div>{props.following.length}</div>
            <p>Following</p>
          </li>
          <li className="flex flex-col items-center justify-around">
            <div>{props.follower.length}</div>
            <p>Follower</p>
          </li>
        </ul>
        {c_username === props._username ? null : props.following.filter(
            (e) => e.address === c_address
          ).length ? (
          <div className="p-4 border-t mx-8 mt-2">
            <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
              Following
            </button>
          </div>
        ) : (
          <div className="p-4 border-t mx-8 mt-2">
            <button
              className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
              onClick={() => follow(props._username).then().catch(console.log)}
            >
              Follow
            </button>
          </div>
        )}
      </>
    </div>
  );
}

export default UserCard;
