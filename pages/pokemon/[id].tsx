import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Details.module.css";

interface IPokemonId {
  name: string;
  type: [];
  stats: {
    name: string;
    value: number;
  }[];
  image: string;
}

const Details = () => {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState<IPokemonId>();

  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      setPokemon(await res.json());
    }
    if (id) {
      getPokemon();
    }
  }, [id]);
  if (!pokemon) {
    return null;
  }
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">Back to home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attributes}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
