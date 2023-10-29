import { Avatar, Dropdown, Navbar as Nav } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth/slices";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, username } = useSelector((state) => {
    return {
      id: state.auth?.id,
      username: state.auth.username,
    };
  });  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Nav className="shadow-sm" rounded>
      <Nav.Brand href="/">
        <span className="self-center text-2xl font-semibold font-albra whitespace-nowrap dark:text-white">
          Shopify<span className="text-orange-500 text-4xl">.</span>
        </span>
      </Nav.Brand>
      <Nav.Collapse>
        <Nav.Link href="/">
          <p>Home</p>
        </Nav.Link>
      </Nav.Collapse>
      <div className="flex md:order-2">
        {username ? (
          <Dropdown
            inline
            label={
                <Avatar
                  alt="User settings"
                  
                  img={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_YCalozv20Oki516pDRvDiNfByLm_OxvEZc6_XN6TIw&s'
                  }
                  rounded
                />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{username}</span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Nav.Link href="/cart">Cart</Nav.Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Nav.Link href="/transactions">Transaction History</Nav.Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Nav.Link href="/manage/product">Manage Product</Nav.Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex items-center">
            <a href="/auth/login">
              <button
                type="button"
                className="text-slate-900 hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Log In
              </button>
            </a>
            <a href="/auth/signup">
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-blue-100 rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
            </a>
          </div>
        )}
        <Nav.Toggle />
      </div>
    </Nav>
  );
}
