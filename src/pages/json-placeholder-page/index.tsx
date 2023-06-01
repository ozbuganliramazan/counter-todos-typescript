import useJsonPlaceholderApi, {
  JsonPlaceholderApi,
  JsonPlaceholderUserType,
} from "../../hooks/useJsonPlaceholderApi";
import { AxiosResponse } from "axios";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

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
          users.map((item, index) => {
            return (
              <Col sm="4" key={item.id}>
                {item.name}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
}
