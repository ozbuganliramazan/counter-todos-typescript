import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useJsonPlaceholderApi, {
  JsonPlaceholderUserType,
  JsonPlaceholderAlbumType,
  JsonPlaceholderPostType,
} from "../../hooks/useJsonPlaceholderApi";
import Loading from "../../components/loading";
import { Row,Col} from "react-bootstrap";
import Box from "./components/box";

type UserDetailParamType = {
  userId: string | undefined;
};

export default function JsonPlaceholderUserDetailPage() {
  const [user, setUser] = useState<JsonPlaceholderUserType | null>(null);
  const [albums, setAlbums] = useState<JsonPlaceholderAlbumType[] | null>(null);
  const [posts, setPosts] = useState<JsonPlaceholderPostType[] | null>(null);

  const [initialized, setInitialized] = useState<boolean>(false);

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

        setUser(results[0] as JsonPlaceholderUserType);
        setAlbums(results[1] as JsonPlaceholderAlbumType[]);
        setPosts(results[2] as JsonPlaceholderPostType[]);

        setInitialized(true);
      }
    })();
  }, []);

  if (!initialized) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className=" p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">User Details</h1>
      </div>
     <Row>
      <Col sm="3">
        <strong>Name:</strong>
        {user?.name}
      </Col>
      <Col sm="3">
        <strong>Email:</strong>
        {user?.email}
      </Col>
      <Col sm="3">
        <strong>Phone:</strong>
        {user?.phone}
      </Col>
      <Col sm="3">
        <strong>Website:</strong>
        {user?.website}
      </Col>
     </Row>
      <hr/>

      <div className=" p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">User Albums</h1>
      </div>
      <Row>
        {albums?.map((album: JsonPlaceholderAlbumType, index) => {
          return (
            <Col sm="3" key={index} >
              <Box album={album} boxTitle="Albüm" linkTarget="albums" />
            </Col>
          );
        })}
      </Row>

      <hr />

      <div className="p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">User Posts</h1>
      </div>

      <Row>
        {posts?.map((post: JsonPlaceholderPostType, index) => {
          return (
            <Col sm="3" key={index}>
              <Box album={post} boxTitle="Blog Post" linkTarget="posts" />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
 
