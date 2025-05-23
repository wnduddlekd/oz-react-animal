import { useParams } from "react-router-dom";
import { data } from "../assets/data/data";

export default function Detail() {
  const params = useParams();
  console.log(params.id); // id 값 조회
  const animalData = data.find((el) => el.id === Number(params.id));
  console.log(animalData); // animalData 조회

  return (
    <section className="detail">
      <img src={animalData.img} alt={animalData.name} />
      <h2>{animalData.name}</h2>
      <div>{animalData.description}</div>
    </section>
  );
}
