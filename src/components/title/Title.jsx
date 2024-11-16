import "./Title.css";

// assets
import Mario from "../../assets/img/mario.png";

export const Title = () => {
  return (
    <div className="title-container">
        <img src={Mario} alt="" className="mario-logo"/>
        <h1 className="title">Mario Jump</h1>
    </div>
  )
}
