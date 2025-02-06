import { useLoaderContext } from "../../context/LoaderContext";
import "./Loader.css";

const Loader = () => {
    const { isLoading } = useLoaderContext();

    return (
        <div className={`loader-overlay ${isLoading ? 'show' : ''}`}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader;