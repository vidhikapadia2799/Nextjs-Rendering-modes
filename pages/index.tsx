import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";

interface IPokemon {
  id: number;
  name: string;
  image: string;
}
interface Props{
  pokemon :IPokemon[]
}

const Home:React.FC<Props> = ({pokemon}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((item: IPokemon) => (
          <div className={styles.card} key={item.id}>
            <Link href={`/pokemon/${item.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${item.image}`}
                alt={item.name}
              />
              <h3>{item.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home

export async function getServerSideProps() {
  const res = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return{
    props:{
      pokemon: await res.json()
    }
  }
}