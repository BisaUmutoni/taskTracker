import './HomePage.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const { currentUser } = auth;
    return (
        <div className='Home'>
            <div className=" home_container">
                <h3> Get on track</h3>
                <p> With Task Tracker</p>;

                {currentUser && currentUser.token ? (
                    <Link to='/Dashboard' className='button'>
                        Get started
                    </Link>
                ) : (
                    <Link to='./LOGIN' className='button'>
                        Get Started
                    </Link>
                )}
            </div>
        </div>
    )
}

export default HomePage