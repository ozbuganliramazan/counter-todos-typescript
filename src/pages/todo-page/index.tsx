import { ReactElement, useState } from "react";
import { Row, Col, Table, Button, Modal, Form } from "react-bootstrap";

type TodoType = {
  id: number;
  title: string;
  is_done: boolean;
};

export default function TodoPage() {
  const [modalshow, setModalShow] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: 1,
      title: "Learn React",
      is_done: false,
    },
    {
      id: 2,
      title: "Learn Redux",
      is_done: true,
    },
    {
      id: 3,
      title: "Learn javascript",
      is_done: true,
    },
  ]);
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
event.preventDefault();


const data =new FormData(event.currentTarget);
const value = Object.fromEntries(data.entries());
console.log(value);

  }

  return (
    <>
      <Modal show={modalshow} onHide={() => setModalShow(false)}>
        <form onSubmit={onFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Todo Title:</Form.Label>
              <Form.Control type="text" name="title" placeholder="Todo Add" />
              <Form.Text className="text-muted">
                Write todo title here.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" name="is_done" label="Is Done?" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setModalShow(false)}
            >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">Todo Page</h1>
      </div>
      <Row>
        <Col sm={12}>
          <Button
            onClick={() => setModalShow(true)}
            variant="primary"
            className="mb-3"
          >
            Add New Todo
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Is Done?</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {todos.map<ReactElement>((todo: TodoType, index: number) => {
                return (
                  <tr key={index}>
                    <td>{todo.id} </td>
                    <td>{todo.title} </td>
                    <td>
                      <input type="checkbox" checked={todo.is_done} />
                      &nbsp;
                      {todo.is_done ? "Yapıldı" : "Bekliyor"}
                    </td>
                    <td>
                      <Button variant="danger" className="me-2 btn-sm">
                        Delete
                      </Button>
                      <Button variant="success" className="me-2 btn-sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
