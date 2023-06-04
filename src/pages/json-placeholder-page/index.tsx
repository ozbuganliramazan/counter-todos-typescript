import useJsonPlaceholderApi, {
  JsonPlaceholderApi,
  JsonPlaceholderUserType,
} from "../../hooks/useJsonPlaceholderApi";
import { AxiosResponse } from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JsonPlaceholderPage() {
  const api: JsonPlaceholderApi = useJsonPlaceholderApi();

  const [users, setUsers] = useState<JsonPlaceholderUserType[] | null>(null);

  useEffect(() => {
    (async () => {
      const result: AxiosResponse<JsonPlaceholderUserType[]> =
        await api.users();

      setUsers(result.data);
    })();
  }, []);

  // ternary operator ile loading ve user listesini göster
  return (
    <>
      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">User List</h1>
      </div>

      <Row>
        {/* ternary operator ile loading ve user listesini göster */}

        {users === null ? (
          <div>Loading...</div>
        ) : (
          users.map((user, index) => {
            return (
              <Col sm="3">
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
                      {user.name +
                        " test test test test test test ttes test aerg aerg earg"}
                    </h4>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{user.username}</Card.Title>

                    <ul className="list-unstyled mt-3 mb-4">
                      <li>{user.email}</li>
                      <li>{user.website}</li>
                      <li>{user.phone}</li>
                      <li>{user.address.city}</li>
                    </ul>

                    <Link
                      to={"/jsonplaceholder/user/" + user.id}
                      className="w-100 btn btn-lg btn-primary"
                    >
                      Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
}
