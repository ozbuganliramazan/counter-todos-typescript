import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { JsonPlaceholderAlbumType } from "../../../hooks/useJsonPlaceholderApi";

export type BoxPropsType = {
  album: JsonPlaceholderAlbumType;
  boxTitle: string;
  linkTarget: "albums" | "posts";
};

export default function Box(props: BoxPropsType) {
  console.log(">> PROPS", props);

  return (
    <Card className="mb-4 rounded-3 shadow-sm border-primary">
      <Card.Header className="py-3 text-white bg-primary border-primary">
        <h4
          className="my-0 fw-normal"
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {props.boxTitle}
        </h4>
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.album.title}</Card.Title>

        <Link
          to={
            "/jsonplaceholder/user/" +
            props.album.userId +
            "/" +
            props.linkTarget +
            "/" +
            props.album.id
          }
          className="w-100 btn btn-lg btn-primary"
        >
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}