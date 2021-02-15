import axios from 'axios';

const LandignPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing page</h1>;
};

LandignPage.getInitialProps = async () => {
  const response = await axios.get('/api/users/currentuser');
  return response.data;
};

export default LandignPage;
