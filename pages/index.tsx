import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

interface IPokemon {
  id: number;
  name: string;
  image: string;
}

export default function Home() {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);

  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      setPokemon(await res.json());
    }
    getPokemon();
  }, []);

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
