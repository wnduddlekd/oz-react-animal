import { Link, useSearchParams } from "react-router-dom";
import { data } from "../assets/data/data";
import { getRegExp } from "korean-regexp";

export default function Search() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("animal");
  const reg = getRegExp(param);

  const filtereData = data.filter((el) => el.name.match(reg));
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
