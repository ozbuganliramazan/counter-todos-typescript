import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useJsonPlaceholderApi from "../../hooks/useJsonPlaceholderApi";

type UserDetailParamType = {
  userId: string | undefined;
};

export default function JsonPlaceholderUserDetailPage() {
  const api = useJsonPlaceholderApi();
  const params: Readonly<Partial<UserDetailParamType>> =
    useParams<UserDetailParamType>();
  console.log(">> PARAMS", params);


  useEffect(() => {
    (async () => {

      if (params.userId) {
        console.log(">> data isteğine başlıyoruz...");

   const promises = [];
        promises.push(api.getUser(parseInt(params.userId)));
        promises.push(api.albums(parseInt(params.userId)));
        promises.push(api.posts(parseInt(params.userId)));
        
   const results = await Promise.all(promises);
        console.log(">> responselar: ", results);

        
      }
    })();
  }, []);

  return (
    <>
      user details Page
      <hr />
      {params.userId}
    </>
  );
}
