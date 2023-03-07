import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Detail.module.css";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState();
    const {id} = useParams();
    const getMovie = async () => {
        const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
        setLoading(false);
        console.log(json.data.movie)
    }
    useEffect(() => {
        getMovie();
    }, []);
    return (
        <div>
            {loading ? <h1>Loading...</h1> : 
            <div>
                <div><img src={movie.medium_cover_image} alt=''/></div>
                <div>
                    <div>
                        <h3>{movie.title_long}</h3>
                        <ul>
                            <li>스코어 : {movie.rating} / 10</li>
                            <li>러닝타임 : {movie.runtime}분</li>
                            <li>장르 : {movie.genres.map((genre) => ` ${genre}`)}</li>
                        </ul>
                    </div>
                    <div className="bottom">
                        <h4>줄거리</h4>
                        <p> {movie.description_intro ? movie.description_intro : '없음'}</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Detail;