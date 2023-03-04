import React from "react";
import "./ArticleCardStyle.css";

const ArticleCard = ({ name, flag, region }) => {
  return (
    <article className="card ">
      <figure>
        <img src={flag} alt="Screenshot from Hades, the Videogame" />
      </figure>
      <div className="content">
        <h1>{name}</h1>
        <h2>{region}</h2>
      </div>
      <div className="read-more">
        <a href="about"> Read More </a>
      </div>
    </article>
  );
};

export default ArticleCard;
