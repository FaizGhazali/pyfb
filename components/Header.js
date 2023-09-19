import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ background: '#333', padding: '10px', color: '#fff', display: 'flex', alignItems: 'center' }}>
      <Link href="/">
        <img src="images/logo2.png" alt="Logo" style={{ width: '150px', height: '100px' }} />
      </Link>
      <h1 style={{ marginLeft: '20px' }}>Fleet Comander</h1>
    </header>
  );
}

export default Header;
