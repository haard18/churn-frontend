import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/predict')
    }
    return (

        <div className="flex gap-4 flex-col">
            Welcome to Home Page
            <div>

                <button onClick={handleClick} className="btn btn-outline btn-primary">Go to Predict</button>
            </div>

        </div>
    )
}

export default Home
