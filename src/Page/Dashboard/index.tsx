import { useCallback, useEffect, useState } from "react";
import useAddress from "../../store/useAddress";
import useAccount from "../../store/useAccount";
import { useNavigate } from "react-router-dom";
import { get_user_recom } from "../../utils/ao";
import UserCard from "./UserCard";

function Dashboard() {
  const address = useAddress((state) => state.address);
  const username = useAccount((state) => state.username);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const get = useCallback(async () => {
    let recommendaiton = await get_user_recom();
    console.log(recommendaiton);
    const user = recommendaiton.data.filter((e: any) => e.address !== address);
    setUser(user);
  }, []);
  useEffect(() => {
    if (!address?.length || !username?.length) {
      navigate("/");
    }
    console.log(user);
    get().then().catch(console.log);
  }, [address, username]);
  return (
    <div>
      {user.length ? (
        <>
          {user.map((e, i) => (
            <UserCard
              //@ts-ignore
              _address={e.address}
              //@ts-ignore
              name={e.User.name}
              //@ts-ignore
              _username={e.User.username}
              //@ts-ignore
              img={e.User.img.url}
              //@ts-ignore
              articles={e.User.articles}
              //@ts-ignore
              follower={e.User.follower}
              //@ts-ignore
              following={e.User.following}
              key={i}
            />
          ))}
        </>
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-red-500">
            There is no User Register, You are the First User
          </h1>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
