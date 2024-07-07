import { useDispatch, useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/contactsSelectors";
import css from './ContactList.module.css'
import { useEffect } from "react";
import { deleteContact, fetchContacts } from "../../redux/contacts/contactsOps";

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
          <li key={contact.id} className={css.contactListItem}>
            <p>Name: {contact.name}</p>
            <p>Number: {contact.number}</p>
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
