import { Link, useSearchParams } from "react-router-dom";
import { data } from "../assets/data/data";
import { getRegExp } from "korean-regexp";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [filtereData, setFilterData] = useState(data);
  const param = searchParams.get("animal");
  const reg = getRegExp(param);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const newFilterData = data.filter((el) => el.name.match(reg));
      setFilterData(newFilterData);
    }, 100);
    return () => clearTimeout(debounceTimer);
  }, [param]);

  return (
    <ul>
      {filtereData.map((el) => (
        <li key={el.id}>
          <Link to={`/detail/${el.id}`}>
            <img src={el.img} alt={el.name} />
            <div>{el.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
