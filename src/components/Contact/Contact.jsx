import css from './Contact.module.css'

const Contact = ({ id, name, number, deleteContact }) => {
    return <>
            <li className={css.contactItem}>
            <p>{name}</p>
            <p>{number}</p>
            <button onClick={() => deleteContact(id)}>Delete</button>
            </li>
    </>
}

export default Contact;