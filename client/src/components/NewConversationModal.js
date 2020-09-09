import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

export default function NewConversationModal({closeModal}) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();

  function handleSubmit(e){
      e.preventDefault()
      
   //   createConversation(selectedContactIds)
      closeModal()
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
        if (prevSelectedContactIds.includes(contactId))
            return prevSelectedContactIds.filter((prevId) => contactId !== prevId);
        return [...prevSelectedContactIds, contactId];
    });
  }

  return (
    <div>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
