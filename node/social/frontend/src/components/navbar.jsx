import { Link } from 'react-router-dom';

export default function navbar({ current_user }) {
  return (
    <nav>
      <Link to="/">Feed</Link>
      <Link to="/users">Explore Users</Link>
      {current_user && <Link to={`/users/${current_user.id}`}>My Profile</Link>}
    </nav>
  );
}