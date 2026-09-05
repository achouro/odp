import { Link } from 'react-router-dom';

export default function navbar() {
  return (
    <nav>
      <Link to="/">Chats</Link>
      <Link to="/users">New Message</Link>
    </nav>
  );
}