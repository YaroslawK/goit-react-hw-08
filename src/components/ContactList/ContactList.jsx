import { useDispatch, useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import css from './ContactList.module.css'
import { useEffect } from "react";
import { deleteContact, fetchContacts } from "../../redux/contactsOps";

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

 

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };



  if (!contacts || contacts.length === 0) {
    return <div>No contacts available</div>;
  }

  return (
    <div>
      <ul className={css.contactList}>
        {contacts.map((contact) => (
          <li key={contact.id}>
            Name: {contact.name} <br /> Number: {contact.number} <br />
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
