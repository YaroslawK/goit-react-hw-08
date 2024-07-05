import { useDispatch, useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import css from './ContactList.module.css'
import { useEffect } from "react";
import { deleteContact, fetchContacts } from "../../redux/contactsOps";

const ContactList = () => {
  const dispatch = useDispatch  ();
  const contacts = useSelector(selectFilteredContacts);
  const { loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contacts || contacts.length === 0) {
    return <div>No contacts available</div>;
  }

  console.log(contacts);
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => (
        <li key={contact.id}>
          Name: {contact.name} <br /> Number: {contact.number} <br />
          <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
