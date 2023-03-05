import React from "react";
import { useState, useEffect } from "react";
import ArticleCard from "../../cards/ArticleCard";

const Article = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const json = await response.json();
    setData(json);
  };

  const filterData = () => {
    return data.filter((element) => {
      if (element.flags.alt !== undefined) {
        const regex = new RegExp(
          `(${searchTerm}|${searchTerm}\\s|${searchTerm},)`,
          "i"
        ); // Create a regex to match search term or term with space or comma
        return (
          regex.test(element.name.official.toLowerCase()) || // Check for match in official name
          regex.test(element.flags.alt.toLowerCase()) // Check for match in alt flag
        );
      } else {
        return element.name.official
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    });
  };

  const showCountry = filterData().map((element) => {
    return (
      <ArticleCard
        name={element.name.official}
        flag={element.flags.svg}
        region={element.region}
      />
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section>
      <div className="flex items-center space-x-4 justify-center py-4">
        <div className="flex border-2 rounded-md border-teal-400 space-x-2 items-center ">
          <input
            type="search"
            className=" mx-4 bg-transparent outline-0 text-green-700 my-1 "
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <section className="flex flex-wrap align-center justify-center gap-4 my-4">
        {showCountry}
      </section>
    </section>
  );
};

export default Article;
