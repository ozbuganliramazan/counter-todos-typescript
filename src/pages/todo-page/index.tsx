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
  const [editTodo, setEditTodo] = useState<TodoType | null>(null);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (editTodo) {
      const filteredItem: TodoType | undefined = todos.find(
        (item, index) => item.id === editTodo.id
      );

      if (filteredItem) {
        filteredItem.title = formJson.title as string;
        filteredItem.is_done = formJson.is_done ? true : false;
      } else {
        alert("todo bulamadı");
      }
    } else {
      todos.push({
        id: todos.length + 1,
        title: formJson.title as string,
        is_done: formJson.is_done ? true : false,
      });
    }

    setTodos([...todos]);

    setModalShow(false);
  };

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
              <Form.Control
                type="text"
                name="title"
                placeholder="Todo Add"
                defaultValue={editTodo ? editTodo.title : ""}
              />
              <Form.Text className="text-muted">
                Write todo title here.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="is_done"
                label="Is Done?"
                defaultChecked={editTodo ? editTodo.is_done : false}
              />
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
            onClick={() => {
              setEditTodo(null);
              setModalShow(true);
            }}
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
                  <tr key={todo.id}>
                    <td>{todo.id} </td>
                    <td>{todo.title} </td>
                    <td>
                      <input
                        onChange={() => {
                          todos[index].is_done = !todos[index].is_done;
                          setTodos([...todos]);
                        }}
                        type="checkbox"
                        checked={todo.is_done}
                      />
                      &nbsp;
                      {todo.is_done ? "Yapıldı" : "Bekliyor"}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          todos.splice(index, 1);
                          setTodos([...todos]);
                        }}
                        variant="danger"
                        className="me-2 btn-sm"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setEditTodo(todo);
                          setModalShow(true);
                        }}
                        variant="success"
                        className="me-2 btn-sm"
                      >
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
