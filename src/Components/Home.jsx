import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/predict')
    }
    const handleClick2 = () => {
        navigate('/upload')
    }
    return (

        <div className="flex gap-4 flex-col">
          abcbacbanbcahb
            <div>

                <button onClick={handleClick} className="btn btn-outline btn-primary">Go to Predict</button>
                <button onClick={handleClick2} className="btn btn-outline btn-primary">Upload your custom Data</button>
            </div>

        </div>
    )
}

export default Home
